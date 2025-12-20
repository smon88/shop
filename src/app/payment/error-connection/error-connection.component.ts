import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-connection',
  imports: [RouterLink],
  templateUrl: './error-connection.component.html',
  styleUrl: './error-connection.component.css'
})
export class ErrorConnectionComponent implements OnInit {
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
