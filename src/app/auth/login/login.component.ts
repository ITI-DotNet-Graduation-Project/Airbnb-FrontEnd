import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible = false;
  showLoginOptions = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      // Implement authentication logic here
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleLoginOptions() {
    this.showLoginOptions = !this.showLoginOptions;
  }

  continueWithGoogle() {
    console.log('Continue with Google clicked');
    // Implement Google authentication
  }

  continueWithFacebook() {
    console.log('Continue with Facebook clicked');
    // Implement Facebook authentication
  }

  continueWithApple() {
    console.log('Continue with Apple clicked');
    // Implement Apple authentication
  }

  continueWithEmail() {
    console.log('Continue with Email clicked');
    this.showLoginOptions = false;
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
