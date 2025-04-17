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
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { Output, EventEmitter } from '@angular/core';
import { ChComponent } from './shared/ch/ch.component';

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
    ChatbotComponent,
    ChComponent
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  isChatOpen = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    console.log(" from appComponent Chat toggled, now:", this.isChatOpen);
  }

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


  isModalOpen = true;

  openModal() {
    this.isModalOpen = true; 
  }

  closeModal() {
    this.isModalOpen = false; 
  }
  // toggleChat() {
  //   console.log('toggleChat event emitted');
  //   this.isModalOpen = !this.isModalOpen; 
  //   console.log('isModalOpen: ', this.isModalOpen);
  // }


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

      'register',
      'forgot-password',
    ];

    return fullScreenRoutes.some((route) => this.currentRoute.includes(route));
  }
}
