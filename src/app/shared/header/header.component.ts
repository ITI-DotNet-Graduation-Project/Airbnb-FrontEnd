import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProfileMenuComponent } from '../../components/profile-menu/profile-menu.component';
import { ComponentsModule } from '../../components/components.module';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProfileMenuComponent, FormsModule, ComponentsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobile: boolean = false;

  constructor(private GlobalService: GlobalService) {}
  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }

  isScrolled: boolean = false;
  ngOnInit() {
    this.onResize();
    this.GlobalService.checkScroll(this.isScrolled);
  }

  location = 'Cairo';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.GlobalService.checkScroll(this.isScrolled);
    console.log(this.GlobalService.checkScroll(this.isScrolled));
  }

  toggleSearch() {
    this.isScrolled = !this.isScrolled;
    this.GlobalService.checkScroll(this.isScrolled);
  }

  submitSearch() {
    console.log('Search submitted:', {
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guests: this.guestCount,
    });

    this.isScrolled = !this.isScrolled;
    this.GlobalService.checkScroll(this.isScrolled);
  }
}
