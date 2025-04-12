import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../AuthService/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mobile-footer.component.html',
  styleUrl: './mobile-footer.component.css',
})
export class MobileFooterComponent {
  constructor(private router: Router, public authService: AuthService) {}

  isActive(route: string) {
    return this.router.url === route;
  }
}
