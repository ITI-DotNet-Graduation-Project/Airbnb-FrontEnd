import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user/user.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
  ],
  exports: [LoginComponent, RegisterComponent, UserProfileComponent],
})
export class AuthModule {}
