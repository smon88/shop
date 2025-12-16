import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../core/services/product.service';
import { Product } from '../shared/models/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartProduct } from '../shared/models/cart-product';
import { HomeProductComponent } from "../home/components/home-product/home-product.component";

@Component({
  selector: 'app-product',
  imports: [NgOptimizedImage, CurrencyPipe, HomeProductComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  showSuccessToast = false;
  route = inject(ActivatedRoute);
  products: Product[] = [];
  productsService = inject(ProductsService);
  product?: Product;
  pageIndex = 0;
  pageSize = 4;

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
          this.products = products;
        });
    this.route.params.subscribe((params) => {
      this.productsService.getById(params['id']).subscribe((product) => {
        this.product = product;
      });
    });
  }

  addToCart() {
    const storagedProducts: CartProduct[] =
      JSON.parse(localStorage.getItem('cart-products') as string) || [];

    const matched = storagedProducts.find(
      (cartProduct) => cartProduct.productId == this.product?.productId
    );
    if (matched) {
      matched.quantity++;
      localStorage.setItem('cart-products', JSON.stringify(storagedProducts));
    } else {
      storagedProducts.push({
        productId: this.product?.productId || 1, quantity: 1,
        productName: this.product?.name || '',
        productImg: this.product?.urlImg || '',
        productPrice: this.product?.price || 0
      });
      localStorage.setItem('cart-products', JSON.stringify(storagedProducts));
    }
    this.showSuccessToast = true;
    setTimeout(()=> {
      this.showSuccessToast = false;
    },3000)
  }

  getProductPages() {
    const pages = [];
    for (let i = 0; i < this.products.length; i += this.pageSize) {
      pages.push(this.products.slice(i, i + this.pageSize));
    }
    return pages;
  }

  getCurrentProducts() {
    const start = this.pageIndex * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }

  getTotalPages() {
    return Math.ceil(this.products.length / this.pageSize);
  }

  getTotalPagesArray() {
    return Array(this.getTotalPages());
  }

  nextProducts() {
    const total = this.getTotalPages();
    this.pageIndex = (this.pageIndex + 1) % total;
  }

  prevProducts() {
    const total = this.getTotalPages();
    this.pageIndex = (this.pageIndex - 1 + total) % total;
  }

  goToPage(i: number) {
    this.pageIndex = i;
  }
}
