import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { PropertyService } from '../services/property.service';
import { AuthService } from '../AuthService/auth-service.service';
import { forkJoin } from 'rxjs';
import { DefaultNavComponent } from '../default-nav/default-nav.component';

@Component({
  selector: 'app-bookeduser-properties',
  standalone: true,
  imports: [CommonModule, RouterModule, DefaultNavComponent],
  templateUrl: './booked-properties.component.html',
  styleUrls: ['./booked-properties.component.css'],
})
export class BookedPropertiesUserComponent implements OnInit {
  bookedProperties: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private bookingService: BookingService,
    private propertyService: PropertyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBookedProperties();
  }

  loadBookedProperties(): void {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      this.errorMessage = 'Please login to view your booked properties';
      this.isLoading = false;
      return;
    }

    this.bookingService.getUserBookings(userId).subscribe({
      next: (bookings) => {
        console.log(bookings);
        if (bookings.length === 0) {
          this.isLoading = false;
          return;
        }

        const propertyIds = [
          ...new Set(bookings.map((b: any) => b.propertyId)),
        ];
        const propertyObservables = propertyIds.map((id) =>
          this.propertyService.getPropertyById(id.toString())
        );

        forkJoin(propertyObservables).subscribe({
          next: (properties) => {
            console.log('-->', properties);
            this.bookedProperties = properties;
            this.isLoading = false;
          },
          error: (err) => {
            this.errorMessage = 'Failed to load some property details';
            this.isLoading = false;
            this.bookedProperties = [];
          },
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load your bookings';
        this.isLoading = false;
      },
    });
  }
}
