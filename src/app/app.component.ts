import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { PaymentModule } from './payment/payment.module';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Airbnb';
}
