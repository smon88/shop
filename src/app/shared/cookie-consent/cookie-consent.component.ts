import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-consent',
  imports: [RouterLink],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.css'
})
export class CookieConsentComponent implements OnInit {
  show = false;

  ngOnInit(): void {
    const consent = localStorage.getItem('cookie-consent');
    this.show = consent !== 'accepted';
  }

  acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    this.show = false;
  }

  rejectCookies() {
    localStorage.setItem('cookie-consent', 'rejected');
    this.show = false;
  }
}
