import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { CookieConsentComponent } from "./shared/cookie-consent/cookie-consent.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
