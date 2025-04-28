import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../AuthService/auth-service.service';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-host-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hostHeader.component.html',
})
export class HeaderHostComponent {
  cartItemCount = 0;
  constructor(
    private router: Router,
    private auth: AuthService,
    private notifocation: MessageService,
    private http: Router
  ) {}

  Logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.http.navigate(['/login']);
        this.notifocation.add({
          severity: 'success',
          summary: 'Logout Successfully',
          detail: 'you logout Successfully',
        });
      },
    });
    this.router.navigate(['/login']);
  }
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
