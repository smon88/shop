import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../core/services/product.service';
import { Product } from '../shared/models/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartProduct } from '../shared/models/cart-product';
import { HomeProductComponent } from '../home/components/home-product/home-product.component';
import { LoadingComponent } from "../shared/components/loading/loading.component";

@Component({
  selector: 'app-product',
  imports: [NgOptimizedImage, CurrencyPipe, HomeProductComponent, LoadingComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy{
  showSuccessToast = false;
  route = inject(ActivatedRoute);
  products: Product[] = [];
  productsService = inject(ProductsService);
  product?: Product;
  pageIndex = 0;
  pageSize = 4;
  itemsPerSlide = 4;
  slides: any[][] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.updateItemsPerSlide();
    this.buildSlides();
    window.addEventListener('resize', this.onResize);
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.buildSlides();
    });
    this.route.params.subscribe((params) => {
      this.productsService.getById(params['id']).subscribe((product) => {
        this.product = product;
      });
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const old = this.itemsPerSlide;
    this.updateItemsPerSlide();
    if (old !== this.itemsPerSlide) this.buildSlides();
  };

  updateItemsPerSlide() {
    const w = window.innerWidth;
    if (w < 768) this.itemsPerSlide = 2;
    else if (w < 1024) this.itemsPerSlide = 3;
    else this.itemsPerSlide = 4;
    console.log(this.itemsPerSlide);
  }

  buildSlides() {
    const items = Math.max(1, this.itemsPerSlide || 1);

    this.slides = [];
    for (let i = 0; i < (this.products?.length || 0); i += items) {
      this.slides.push(this.products.slice(i, i + items));
    }

    // Clamp seguro
    const lastIndex = Math.max(0, this.slides.length - 1);
    this.pageIndex = Math.min(Math.max(this.pageIndex, 0), lastIndex);

    // Si no hay slides, deja en 0
    if (this.slides.length === 0) this.pageIndex = 0;
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
        productId: this.product?.productId || 1,
        quantity: 1,
        productName: this.product?.name || '',
        productImg: this.product?.urlImg || '',
        productPrice: this.product?.price || 0,
      });
      localStorage.setItem('cart-products', JSON.stringify(storagedProducts));
    }
    this.showSuccessToast = true;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
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
    const total = this.slides.length || 1;
    this.pageIndex = (this.pageIndex + 1) % total;
  }

  prevProducts() {
    const total = this.slides.length || 1;
    this.pageIndex = (this.pageIndex - 1 + total) % total;
  }

  goToPage(i: number) {
    const last = Math.max(0, this.slides.length - 1);
    this.pageIndex = Math.min(Math.max(i, 0), last);
  }
}
