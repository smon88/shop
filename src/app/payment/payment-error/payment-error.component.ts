import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-error',
  imports: [RouterLink],
  templateUrl: './payment-error.component.html',
  styleUrl: './payment-error.component.css'
})
export class PaymentErrorComponent implements OnInit{
  ngOnInit(): void {
    let successCounter = Number(localStorage.getItem('scid')) || 0;
    localStorage.setItem('scid', String(successCounter + 1));
    localStorage.removeItem('mi')
    localStorage.removeItem('m')
    setTimeout(() => {
      location.href = "/";
    }, 9000)
  }

}
