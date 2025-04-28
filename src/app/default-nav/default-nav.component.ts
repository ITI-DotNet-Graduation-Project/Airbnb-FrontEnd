import { Component, HostListener } from '@angular/core';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../global.service';
import { CommonModule } from '@angular/common';
import { ProfileMenuComponent } from '../components/profile-menu/profile-menu.component';

@Component({
  selector: 'app-default-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, ProfileMenuComponent],
  templateUrl: './default-nav.component.html',
  styleUrl: './default-nav.component.css',
})
export class DefaultNavComponent {
  isMobile: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }
  isScrolled: boolean = false;
  ngOnInit() {
    this.onResize();
    this.GlobalService.checkScroll(this.isScrolled);
  }

  location = '';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 1;
  cartItemCount = 0;
  constructor(
    private router: Router,
    private GlobalService: GlobalService,
    private cartService: CartService
  ) {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItemCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.GlobalService.checkScroll(this.isScrolled);
  }

  toggleSearch() {
    this.isScrolled = !this.isScrolled;
    this.GlobalService.checkScroll(this.isScrolled);
  }
}
