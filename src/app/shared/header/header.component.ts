import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProfileMenuComponent } from '../../components/profile-menu/profile-menu.component';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProfileMenuComponent, FormsModule, ComponentsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobile: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }

  ngOnInit() {
    this.onResize();
  }
  isScrolled = false;

  location = 'Cairo';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleSearch() {
    this.isScrolled = !this.isScrolled;
  }

  submitSearch() {
    console.log('Search submitted:', {
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guests: this.guestCount,
    });

    this.isScrolled = !this.isScrolled;
  }
}
