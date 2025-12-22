import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CookieConsentComponent } from './shared/cookie-consent/cookie-consent.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "./shared/components/loading/loading.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CookieConsentComponent,
    CommonModule,
    LoadingComponent
],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  loading = true;

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.loading = false;
    });
  }
}
