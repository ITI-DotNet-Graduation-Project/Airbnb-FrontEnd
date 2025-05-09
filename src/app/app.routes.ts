import { Routes } from '@angular/router';
import { authGuard } from './AuthGuard/auth.guard';
import { CardComponent } from './components/cards/card/card/card.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmailConfirmationComponent } from './auth/email-confirmation/email-confirmation.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HostDashboardComponent } from './Host/host-dashboard/host-dashboard.component';
import { AddPropertyComponent } from './Host/add-property/add-property.component';
import { EditPropertyComponent } from './Host/edit-property/edit-property.component';
import { ViewPropertyComponent } from './Host/view-property/view-property.component';
import { UserProfileComponent } from './auth/user/user.component';
import { PropertyDetailsComponent } from './Host/property-details/property-details.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BookedPropertiesComponent } from './Host/booked-properties/booked-properties.component';
import { AvailablePropertiesComponent } from './Host/available-properties/available-properties.component';
import { noAuthGuard } from './AuthGuard/no-auth-service.guard';
import { roleGuard } from './AuthGuard/role-based.guard';
import { BookedPropertiesUserComponent } from './booked-properties/booked-properties.component';

export const routes: Routes = [
  {
    path: '',
    component: CardComponent,
    canActivate: [roleGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard],
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
    canActivate: [authGuard],
  },

  {
    path: 'properties/:id',
    component: PropertyDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'booking-confirmation/:id',
    component: BookingConfirmationComponent,
    canActivate: [authGuard],
  },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
  {
    path: 'search-results',
    component: SearchResultsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'properties/:id',
    component: PropertyDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-bookings',
    component: BookedPropertiesUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'host',
    canActivate: [authGuard, roleGuard],

    children: [
      { path: 'dashboard', component: HostDashboardComponent },
      { path: 'properties/add', component: AddPropertyComponent },
      { path: 'properties/edit/:id', component: EditPropertyComponent },
      { path: 'properties/view/:id', component: ViewPropertyComponent },
      {
        path: 'BookedPropeties/view',
        component: BookedPropertiesComponent,
      },
      {
        path: 'AvailablePropeties/view',
        component: AvailablePropertiesComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];
