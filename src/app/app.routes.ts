import { Routes } from '@angular/router';
import { authGuard } from './AuthGuard/auth.guard';
import { CardComponent } from './components/cards/card/card/card.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { CardDetailsPageComponent } from './components/cards/card/details/card-details-page/card-details-page.component';
import { PaymentModule } from './payment/payment.module';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

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
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];
