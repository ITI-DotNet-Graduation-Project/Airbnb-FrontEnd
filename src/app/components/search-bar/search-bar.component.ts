import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  location = '';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 1;

  isExpanded: boolean = false;
  constructor(private searchService: SearchService, private router: Router) {}
  submitSearch() {
    const searchData = {
      location: this.location,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestCount: this.guestCount,
    };
    console.log(searchData);
    this.searchService.searchProperties(searchData).subscribe({
      next: (results) => {
        console.log('Search results from header:', results);
        this.collapseSearch();

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
  expandSearch(): void {
    this.isExpanded = true;
  }

  collapseSearch(): void {
    this.isExpanded = false;
  }
}
