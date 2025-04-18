import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../AuthService/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../models/User.models';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink], // Only include RouterLink if you'll use it
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  user: User | null = null;
  private userSub: Subscription | null = null;
  userLoaded = false; // Prevent redundant calls

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userLoaded && this.authService.getToken()) {
      this.getImage();
    }
  }

  getImage() {
    this.userLoaded = true;
    this.userSub = this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.user = { ...this.user, imageUrl: res.imageUrl };
        },
        error: (err) => {
          console.log(err);
          this.userLoaded = false;
        },
      });
  }

  get userImageUrl(): string {
    return this.user?.imageUrl
      ? `https://localhost:7042/${this.user.imageUrl}`
      : 'https://a0.muscache.com/defaults/user_pic-50x50.png';
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.isMenuOpen = false;
    this.user = null;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.isMenuOpen = false;
    }
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
  displayImage() {
    return `https://localhost:7042/${this.user.imageUrl}`;
  }
}
