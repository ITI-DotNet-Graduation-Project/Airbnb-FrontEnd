import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileMenuComponent } from '../../components/profile-menu/profile-menu.component';
import { ComponentsModule } from '../../components/components.module';
import { GlobalService } from '../../global.service';
import { SearchService } from '../../services/search.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterLink,
    ProfileMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  isScrolled: boolean = false;
  location = '';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 1;
  cartItemCount = 0;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private GlobalService: GlobalService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.checkViewportSize();
    this.setupCartSubscription();
  }

  @HostListener('window:resize')
  checkViewportSize() {
    this.isMobile = window.innerWidth < 992;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.GlobalService.checkScroll(this.isScrolled);
  }

  setupCartSubscription() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItemCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });
  }

  submitSearch() {
    if (!this.validateSearchInputs()) {
      return;
    }

    const searchData = {
      location: this.location.trim(),
      checkInDate: this.formatDate(this.checkInDate),
      checkOutDate: this.formatDate(this.checkOutDate),
      guestCount: this.guestCount,
    };

    // Navigate first with query parameters
    this.router
      .navigate(['/search-results'], {
        queryParams: searchData,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        console.log('Navigation to search results completed');
      })
      .catch((err) => {
        console.error('Navigation error:', err);
      });
  }

  private validateSearchInputs(): boolean {
    if (!this.location || !this.checkInDate || !this.checkOutDate) {
      console.warn('Please fill in all required search fields');
      return false;
    }

    if (new Date(this.checkOutDate) <= new Date(this.checkInDate)) {
      console.warn('Check-out date must be after check-in date');
      return false;
    }

    return true;
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  toggleSearch() {
    this.isScrolled = !this.isScrolled;
    this.GlobalService.checkScroll(this.isScrolled);
  }
  goToBookedProperties() {
    this.router.navigate(['/my-bookings']);
  }
}
