import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/models/product';
import { ProductsService } from '../core/services/product.service';
import { HomeProductComponent } from './components/home-product/home-product.component';
import { RouterLink } from '@angular/router';
import { HomeProductLoadingComponent } from './components/home-product-loading/home-product-loading.component';

@Component({
  selector: 'app-home',
  imports: [ProductOfferComponent, HomeProductComponent, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productsService = inject(ProductsService);
  products: Product[] = [];
  productsOffers?: Product[];
  pageIndex = 0;
  pageSize = 4;

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.productsOffers = this.products.filter(
        (product) => product.previousPrice
      );

      setTimeout(() => {
        initFlowbite();
      }, 200);
    });
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
