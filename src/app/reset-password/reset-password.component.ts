import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth-service.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [LoadingComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordStrength = 0;
  passwordStrengthText = '';
  strengthClass = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordService: AuthService
  ) {
    this.resetForm = new FormGroup(
      {
        token: new FormControl(this.route.snapshot.queryParamMap.get('code')),
        email: new FormControl(this.route.snapshot.queryParamMap.get('email')),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      this.passwordMatchValidator
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetForm.patchValue({
        token: params['code'] || '',
        email: params['email'] || '',
      });
    });
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { mismatch: true };
    }
    return null;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.resetForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswordStrength(): void {
    const password = this.resetForm.get('password')?.value;
    if (!password) {
      this.passwordStrength = 0;
      return;
    }

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    this.passwordStrength = Math.min(strength, 4);

    switch (this.passwordStrength) {
      case 0:
      case 1:
        this.passwordStrengthText = 'Very weak';
        this.strengthClass = 'weak';
        break;
      case 2:
        this.passwordStrengthText = 'Weak';
        this.strengthClass = 'weak';
        break;
      case 3:
        this.passwordStrengthText = 'Good';
        this.strengthClass = 'medium';
        break;
      case 4:
        this.passwordStrengthText = 'Strong';
        this.strengthClass = 'strong';
        break;
    }
  }

  hasUpperCase(): boolean {
    const password = this.resetForm.get('password')?.value;
    return password && /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.resetForm.get('password')?.value;
    return password && /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.resetForm.get('password')?.value;
    return password && /[0-9]/.test(password);
  }

  hasSpecialChar(): boolean {
    const password = this.resetForm.get('password')?.value;
    return password && /[!@#$%^&*]/.test(password);
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { token, email } = this.resetForm.value;
    const newpassword = this.resetForm.value.password;
    console.log(token, email, newpassword);
    this.passwordService.resetPassword(email, token, newpassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], {
          queryParams: { passwordReset: 'success' },
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Password reset failed:', error);
      },
    });
  }
}
