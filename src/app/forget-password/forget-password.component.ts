import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../AuthService/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private notification: MessageService,
    private router: Router
  ) {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
      next: () => {
        this.notification.add({
          severity: 'success',
          summary: 'Password Send successful',
          detail: 'Password reset link sent to your email',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.notification.add({
          severity: 'error',
          summary: 'Password reset successful',
          detail: err.error?.description || 'Failed to send reset link',
        });
      },
    });
  }
}
