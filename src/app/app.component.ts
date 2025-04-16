import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { PaymentModule } from './payment/payment.module';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './components/cards/card/card/card.component';
import { CardModule } from './components/cards/card/card.module';
import { DetailsModule } from './components/cards/card/details/details.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HostDashboardComponent } from './Host/host-dashboard/host-dashboard.component';
import { UserProfileComponent } from './auth/user/user.component';

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
    PaymentModule,
    FooterComponent,
    CardModule,
    CommonModule,
    DetailsModule,
    ToastModule,
    UserProfileComponent,
    HostDashboardComponent,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Airbnb';
  isMobile: boolean = false;
  dataLoading = true;
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

  currentRoute: string = '';

  constructor(public messageService: MessageService, private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isFullScreenRoute(): boolean {
    const fullScreenRoutes = [
      'not-found',
      'confirm-email',
      'login',
      'reset-password',
      'forget-password',
      'host',
      'register',
      'forgot-password',
      'profile',
    ];

    return fullScreenRoutes.some((route) => this.currentRoute.includes(route));
  }
}
