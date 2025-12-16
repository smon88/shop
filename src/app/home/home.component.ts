import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  productsService = inject(ProductsService);
  products: Product[] = [];
  productsOffers?: Product[];
  pageSize = 4;
  pageIndex = 0;
  itemsPerSlide = 4;
  slides: any[][] = [];

  ngOnInit(): void {
    this.updateItemsPerSlide();
    this.buildSlides();
    window.addEventListener('resize', this.onResize);
    this.productsService.getAll().subscribe((products) => {
      console.log(products);
      this.products = products;
      this.productsOffers = this.products.filter(
        (product) => product.previousPrice
      );

      this.buildSlides();

      setTimeout(() => {
        initFlowbite();
      }, 200);
    });
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
