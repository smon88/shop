import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartProduct } from '../../models/cart-product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  cartItems: number = 0;
  private intervalId?: number;
  mobileMenuOpen = false;

  ngOnInit(): void {
    this.updateCartCount();

    // ✅ Esto mantiene el contador actualizado (simple y efectivo)
    this.intervalId = window.setInterval(() => {
      this.updateCartCount();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) window.clearInterval(this.intervalId);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
  

  private updateCartCount(): void {
    const stored = localStorage.getItem('cart-products');

    if (!stored) {
      this.cartItems = 0;
      return;
    }

    try {
      const cart: CartProduct[] = JSON.parse(stored);
      this.cartItems = Array.isArray(cart) ? cart.length : 0;
    } catch {
      this.cartItems = 0;
    }
  }
}
