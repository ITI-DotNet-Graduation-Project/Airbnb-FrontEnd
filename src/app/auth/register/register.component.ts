import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../AuthService/auth-service.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isModalVisible = true;
  isPasswordVisible = false;
  registerForm: FormGroup;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.required],
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      }),
      role: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    console.log(this.registerForm.value);
    this.authService
      .register({
        email: this.registerForm.value.email,
        password: this.registerForm.controls.password.value,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        role: this.registerForm.value.role,
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Registration successful',
            detail:
              "'Registration successful! Please check your email to verify your account.'",
          });

          this.isModalVisible = false;
          setTimeout(() => {
            this.router.navigate(['confirm-email'], {
              queryParams: { email: this.registerForm.controls.email.value },
            });
          }, 3000);
        },
        error: (error) => {
          if (error.status == 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Dublicate Email!!',
              detail: error.error?.message || 'Email Exist Already',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'error occurred',
              detail:
                error.error?.message || 'An error occurred during registration',
            });
          }
          this.isLoading = false;
        },
      });
  }

  private markAllAsTouched() {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
