import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../AuthService/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
})
export class ProfileMenuComponent {
  isMenuOpen = false;

  constructor(public authService: AuthService) {}

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled:', this.isMenuOpen);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.isMenuOpen = false;
    }
  }
}
