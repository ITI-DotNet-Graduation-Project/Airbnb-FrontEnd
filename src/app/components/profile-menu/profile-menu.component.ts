import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { AuthService } from '../../AuthService/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../models/User.models';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  user: User = {
    email: '',
    firstName: '',
    id: '',
    imageUrl: '',
    lastName: '',
    role: '',
  };

  private userSub: Subscription | null = null;
  userLoaded = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userLoaded && this.authService.getToken()) {
      this.getImage();
    }
  }

  getImage() {
    this.userLoaded = true;
    this.userSub = this.authService.getCurrentUser().subscribe({
      next: (res: User) => {
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
      ? `https://airbnbclone.runasp.net/${this.user.imageUrl}`
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
    return `https://airbnbclone.runasp.net/${this.user.imageUrl}`;
  }
}
