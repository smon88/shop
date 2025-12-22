import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Zentra',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'cart',
    title: 'Zentra | Carrito',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'products',
    title: 'Zentra | Productos',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'products/:id',
    title: 'Zentra | Product Details',
    loadComponent: () => import('./product/product.component').then(m => m.ProductComponent)
  },
  {
    path: 'checkout',
    title: 'Zentra | Checkout',
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'payment',
    title: 'Zentra | Payment',
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent)
  },
  {
    path: 'payment/success',
    title: 'Zentra | Payment Success',
    loadComponent: () => import('./payment/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent)
  },
  {
    path: 'payment/error',
    title: 'Zentra | Payment Error',
    loadComponent: () => import('./payment/payment-error/payment-error.component').then(m => m.PaymentErrorComponent)
  },
  {
    path: 'payment/error-connection',
    title: 'Zentra | Payment Error',
    loadComponent: () => import('./payment/error-connection/error-connection.component').then(m => m.ErrorConnectionComponent)
  },
  {
    path: 'policies',
    title: 'Zentra | Politicas de Privacidad',
    loadComponent: () => import('./pp/pp.component').then(m => m.PpComponent)
  },
  {
    path: 'terms',
    title: 'Zentra | Terminos y Condiciones',
    loadComponent: () => import('./tyt/tyt.component').then(m => m.TytComponent)
  },
];
