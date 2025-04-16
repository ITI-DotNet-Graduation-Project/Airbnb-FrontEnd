import { Routes } from '@angular/router';
import { authGuard } from './AuthGuard/auth.guard';
import { CardComponent } from './components/cards/card/card/card.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { CardDetailsPageComponent } from './components/cards/card/details/card-details-page/card-details-page.component';
import { PaymentModule } from './payment/payment.module';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HostDashboardComponent } from './Host/host-dashboard/host-dashboard.component';
import { AddPropertyComponent } from './Host/add-property/add-property.component';
import { EditPropertyComponent } from './Host/edit-property/edit-property.component';
import { ViewPropertyComponent } from './Host/view-property/view-property.component';
import { BookingsComponent } from './Host/bookings/bookings.component';
import { UserProfileComponent } from './auth/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: CardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'reset-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'forget-password',
    component: ResetPasswordComponent,
  },

  {
    path: 'confirm-email',
    component: EmailConfirmationComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'card/:id',
    component: CardDetailsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment/:id',
    component: PaymentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'host',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: HostDashboardComponent },
      { path: 'properties/add', component: AddPropertyComponent },
      { path: 'properties/edit/:id', component: EditPropertyComponent },
      { path: 'properties/view/:id', component: ViewPropertyComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];
