import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './components/cards/card/card/card.component';
import { CardModule } from './components/cards/card/card.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HostDashboardComponent } from './Host/host-dashboard/host-dashboard.component';
import { UserProfileComponent } from './auth/user/user.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ChComponent } from './shared/ch/ch.component';
import { CardDetailsComponent } from './components/cards/card/card-details/card-details.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';

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
    ChComponent,
    FooterComponent,
    CardModule,
    CommonModule,
    ChatbotComponent,
    ToastModule,
    PropertyDetailsComponent,
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
  isChatOpen = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    console.log(' from appComponent Chat toggled, now:', this.isChatOpen);
  }
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
      'properties',
      'booking-confirmation',
      'wishlist',
      'search-results',
    ];

    return fullScreenRoutes.some((route) => this.currentRoute.includes(route));
  }
}
