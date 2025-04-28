import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../AuthService/auth-service.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MessageService } from 'primeng/api';
import { LoginResponse } from '../../models/RegisterRequest.modes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible = false;
  showLoginOptions = false;
  isModalVisible = true;
  isLoading = false;
  constructor(
    private notificationService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
    });
  }

  onSubmit() {
    if (this.isLoading) return;
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(email, password).subscribe({
      next: (response: LoginResponse) => {
        this.isLoading = false;
        localStorage.setItem('currentUser', JSON.stringify(response));

        this.notificationService.add({
          severity: 'success',
          summary: 'Login successful',
          detail: 'Welcome back!',
        });

        this.isModalVisible = false;
        console.log(response.role);
        if (response.role === 'Host') {
          this.router.navigate(['/host']).catch((err) => {
            console.error('Navigation error:', err);
          });
        } else {
          this.router.navigate(['/']).catch((err) => {
            console.error('Navigation error:', err);
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.add({
          severity: 'error',
          summary: 'Login failed',
          detail: 'Invalid credentials or server error',
        });
      },
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
