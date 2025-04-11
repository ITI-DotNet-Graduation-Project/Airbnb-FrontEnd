import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule {}
