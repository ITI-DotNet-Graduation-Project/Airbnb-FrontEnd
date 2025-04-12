import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { PaymentModule } from './payment/payment.module';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SharedModule,
    RouterOutlet,
    AuthModule,
    ComponentsModule,
    SearchBarComponent,
    CommonModule,
    PaymentModule,
    CardsComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Airbnb';
  isMobile: boolean = false;

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
  scrollY: number = 0;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;
    console.log(this.scrollY);
  }
}
