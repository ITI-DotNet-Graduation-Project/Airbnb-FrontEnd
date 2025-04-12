import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CardComponent } from './components/cards/card/card/card.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CardComponent },
];
