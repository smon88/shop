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
  private lastScrollTop = 0;
  private readonly delta = 8; // “tolerancia” para evitar parpadeo
  private readonly offset = 80; // a partir de qué scroll empieza a ocultar
  private intervalId?: number;

  private onScroll = () => {
    const st = window.scrollY || document.documentElement.scrollTop;

    // si estás muy arriba, siempre visible
    if (st <= this.offset) {
      this.hideNavbar = false;
      this.lastScrollTop = st;
      return;
    }

    const diff = st - this.lastScrollTop;
    if (Math.abs(diff) < this.delta) return; // evita micro movimientos

    if (diff > 0) {
      // bajando
      this.hideNavbar = true;
    } else {
      // subiendo
      this.hideNavbar = false;
    }

    this.lastScrollTop = st;
  };

  hideNavbar = false;
  cartItems: number = 0;
  mobileMenuOpen = false;

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.updateCartCount();

    // ✅ Esto mantiene el contador actualizado (simple y efectivo)
    this.intervalId = window.setInterval(() => {
      this.updateCartCount();
    }, 500);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
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
