import { Component, inject } from '@angular/core';
import { HomeProductComponent } from '../home/components/home-product/home-product.component';
import { HomeProductLoadingComponent } from '../home/components/home-product-loading/home-product-loading.component';
import { initFlowbite } from 'flowbite';
import { ProductsService } from '../core/services/product.service';
import { Product } from '../shared/models/product';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-products',
  imports: [
    HomeProductLoadingComponent,
    ProductsListComponent,
    LoadingComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  products: Product[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.loadCategories();
    this.loadProducts();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  categories: any[] = [];

  filteredProducts: Product[] = [];

  selectedCategoryId: number | null = null;
  searchTerm = '';

  loadCategories() {
    this.categories = [
      { id: 3, title: 'computadores' },
      { id: 6, title: 'celulares' },
      { id: 9, title: 'videojuegos' },
      { id: 12, title: 'otros' },
      { id: 15, title: 'televisores' },
    ];
  }

  loadProducts() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId = value ? Number(value) : null;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(this.searchTerm);

      const matchCategory =
        this.selectedCategoryId === null ||
        product.categoryId === this.selectedCategoryId;

      return matchName && matchCategory;
    });
  }
}
