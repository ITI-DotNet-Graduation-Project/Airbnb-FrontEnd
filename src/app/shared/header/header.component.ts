
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isScrolled = false;

  location = 'Cairo';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;

    if (this.isScrolled) {
      this.isScrolled = true;
    }
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
