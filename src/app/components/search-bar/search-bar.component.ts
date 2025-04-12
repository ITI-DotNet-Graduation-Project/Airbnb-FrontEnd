import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  location: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  guestCount: number = 1;
  isExpanded: boolean = false;

  expandSearch(): void {
    this.isExpanded = true;
  }

  collapseSearch(): void {
    this.isExpanded = false;
  }

  submitSearch(): void {
    console.log({
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guests: this.guestCount,
    });

    this.collapseSearch();
  }
}
