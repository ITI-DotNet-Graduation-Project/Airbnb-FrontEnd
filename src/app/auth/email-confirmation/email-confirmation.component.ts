import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../AuthService/auth-service.service';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.css',
})
export class EmailConfirmationComponent {
  email: string = localStorage.getItem('email');
  isResending: boolean = false;
  cooldown: number = 0;

  notificationState: 'hidden' | 'loading' | 'success' | 'error' = 'hidden';
  notificationMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('code');

    if (token) {
      this.verifyEmail(userId, token);
    }
  }

  verifyEmail(userId: string | null, token: string | null) {
    if (!token) {
      this.notificationState = 'error';
      this.notificationMessage = 'No confirmation token provided.';
      return;
    }

    this.notificationState = 'loading';
    this.notificationMessage = 'Verifying your email...';

    this.authService.verifyEmail(userId, token).subscribe({
      next: () => {
        this.notificationState = 'success';
        this.notificationMessage =
          'Your email has been successfully confirmed. You can now log in to your account.';
      },
      error: (err) => {
        this.notificationState = 'error';
        this.notificationMessage =
          err.error?.message ||
          'The confirmation link is invalid or has expired. Please request a new confirmation email.';
      },
    });
  }

  resendEmail() {
    this.authService.resendVerificationEmail(this.email).subscribe({
      next: () => {
        this.isResending = false;
        this.notificationMessage =
          'Verification email has been sent successfully.';

        this.cooldown = 30;
        const interval = setInterval(() => {
          this.cooldown--;
          if (this.cooldown <= 0) {
            clearInterval(interval);
          }
        }, 1000);
      },
      error: (err) => {
        this.isResending = false;
        this.notificationMessage =
          err.error?.message ||
          'Failed to resend verification email. Please try again later.';
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
