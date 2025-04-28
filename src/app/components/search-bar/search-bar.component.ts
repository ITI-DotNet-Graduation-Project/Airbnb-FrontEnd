import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultNavComponent } from '../../default-nav/default-nav.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, DefaultNavComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  location = '';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 1;
  isExpanded = false;

  constructor(private searchService: SearchService, private router: Router) {}

  submitSearch() {
    if (!this.location || !this.checkInDate || !this.checkOutDate) {
      console.warn('Please fill in all required fields');
      return;
    }

    const searchData = {
      location: this.location.trim(),
      checkInDate: this.formatDate(this.checkInDate),
      checkOutDate: this.formatDate(this.checkOutDate),
      guestCount: this.guestCount,
    };

    console.log('Search data:', searchData);

    this.router
      .navigate(['/search-results'], {
        queryParams: searchData,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.collapseSearch();
      });
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  expandSearch(): void {
    this.isExpanded = true;
  }

  collapseSearch(): void {
    this.isExpanded = false;
  }
}
