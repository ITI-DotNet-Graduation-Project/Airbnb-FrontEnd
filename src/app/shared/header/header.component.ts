// header.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileMenuComponent } from '../../components/profile-menu/profile-menu.component';
import { ComponentsModule } from '../../components/components.module';
import { GlobalService } from '../../global.service';
import { SearchService } from '../../services/search.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ProfileMenuComponent,
    FormsModule,
    ComponentsModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobile: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 992;
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

  constructor(
    private searchService: SearchService,
    private router: Router,
    private GlobalService: GlobalService
  ) {}

  submitSearch() {
    const searchData = {
      location: this.location,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestCount: this.guestCount,
    };

    this.searchService.searchProperties(searchData).subscribe({
      next: (results) => {
        console.log('Search results from header:', results);

        // Ensure results is an array
        if (!Array.isArray(results)) {
          console.error('Expected results to be an array but got:', results);
          results = [];
        }

        const formattedResults = results.map((result: any) => ({
          ...result,
          propertyImages: result.propertyImages
            ? Array.isArray(result.propertyImages)
              ? result.propertyImages
              : [{ imageUrl: result.propertyImages }]
            : [],
        }));

        this.router
          .navigate(['/search-results'], {
            state: {
              results: formattedResults,
              searchParams: searchData,
            },
          })
          .then(() => {
            console.log('Navigation completed');
          })
          .catch((err) => {
            console.error('Navigation error:', err);
          });
      },
      error: (err) => {
        console.error('Search failed:', err);
      },
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
