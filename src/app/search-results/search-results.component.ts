import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultNavComponent } from '../default-nav/default-nav.component';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, DefaultNavComponent],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  minPrice = 0;
  maxPrice = 1000;
  minPricePercent = 0;
  maxPricePercent = 100;
  selectedBedrooms: number | null = null;
  sortOption = 'price-asc';
  currentPage = 0;
  itemsPerPage = 12;
  allProperties: any[] = [];
  filteredProperties: any[] = [];
  displayedProperties: any[] = [];
  searchLocation = '';
  bedroomOptions = [0, 1, 2, 3, 4, 5];
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchLocation = params['location'] || '';
      this.performSearch(params);
    });
  }

  performSearch(params: any) {
    this.isLoading = true;

    const searchData = {
      location: params['location'],
      checkInDate: params['checkInDate'],
      checkOutDate: params['checkOutDate'],
      guestCount: params['guestCount'] || 1,
    };

    this.searchService.searchProperties(searchData).subscribe({
      next: (results) => {
        this.allProperties = this.formatResults(results);
        this.filterProperties();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isLoading = false;
      },
    });
  }

  formatResults(results: any): any[] {
    return Array.isArray(results) ? results : [];
  }

  updatePriceFilter() {
    this.minPricePercent = (this.minPrice / 1000) * 100;
    this.maxPricePercent = (this.maxPrice / 1000) * 100;
    this.filterProperties();
  }

  selectBedrooms(count: number) {
    this.selectedBedrooms = count === this.selectedBedrooms ? null : count;
    this.filterProperties();
  }

  filterProperties() {
    this.filteredProperties = this.allProperties.filter((property) => {
      const priceMatch =
        property.price >= this.minPrice && property.price <= this.maxPrice;
      const bedroomMatch =
        this.selectedBedrooms === null ||
        this.selectedBedrooms === 0 ||
        (this.selectedBedrooms === 5
          ? property.bedrooms >= 5
          : property.bedrooms === this.selectedBedrooms);
      return priceMatch && bedroomMatch;
    });

    this.sortProperties();
    this.goToPage(0);
  }

  sortProperties() {
    this.filteredProperties.sort((a, b) => {
      switch (this.sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return (b.averageRating || 0) - (a.averageRating || 0);
        default:
          return 0;
      }
    });
    this.updateDisplayedProperties();
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.filteredProperties.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedProperties();
  }

  updateDisplayedProperties() {
    const start = this.currentPage * this.itemsPerPage;
    this.displayedProperties = this.filteredProperties.slice(
      start,
      start + this.itemsPerPage
    );
  }

  getPropertyImage(property: any): string {
    if (!property.imageUrl || !property.imageUrl.length) {
      return 'assets/default-property.jpg';
    }

    const firstImage = property.imageUrl;
    const imageUrl = firstImage.imageUrl || firstImage;

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `https://airbnbclone.runasp.net/images/properties/${imageUrl}`;
  }

  isInWishlist(propertyId: number): boolean {
    return false;
  }

  toggleWishlist(event: Event, propertyId: number) {
    event.stopPropagation();
  }

  viewPropertyDetails(id: number) {
    this.router.navigate(['/properties', id]);
  }

  resetFilters() {
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.minPricePercent = 0;
    this.maxPricePercent = 100;
    this.selectedBedrooms = null;
    this.sortOption = 'price-asc';
    this.filterProperties();
  }
}
