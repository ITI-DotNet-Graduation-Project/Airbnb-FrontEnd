import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { MessageService } from 'primeng/api';
import { HeaderHostComponent } from '../HostHeader/hostHeader.component';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  distance: number;
  description?: string;
  maxGuests?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyImages?: any[];
  availabilities?: any[];
  bookings: any[];
  averageRating: number;
}

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PropertyCardComponent,
    HeaderHostComponent,
    HeaderHostComponent,
  ],
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css'],
})
export class HostDashboardComponent implements OnInit {
  totalProperties: number = 0;
  availableToday: number = 0;
  bookedToday: number = 0;
  averageRating: number | null = null;

  properties: Property[] = [];

  loading: boolean = true;
  error: string | null = null;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private notification: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    const cntOfAvalabilty = 0;
  }
  container: Property[] = [];
  loadDashboardData() {
    this.loading = true;
    this.error = null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.availableToday = 0;
    this.bookedToday = 0;

    this.propertyService.getHostProperties().subscribe({
      next: (response: any) => {
        console.log(response.properties);
        this.properties = response.properties || [];
        this.totalProperties = response.properties.length;

        let totalRating = 0;
        let ratedProperties = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(today);

        response.properties.forEach((property) => {
          let isAvailableToday = false;
          let isBookedToday = false;
          const availableDates: Date[] = [];
          const bookedDates: Date[] = [];

          property.availabilities?.forEach((av) => {
            const start = new Date(av.startDate);
            const end = new Date(av.endDate);

            for (
              let date = new Date(start);
              date <= end;
              date.setDate(date.getDate() + 1)
            ) {
              availableDates.push(new Date(date));
              if (date.toDateString() === today.toDateString()) {
                isAvailableToday = true;
              }
            }
          });

          property.bookings?.forEach((booking) => {
            const start = new Date(booking.checkInDte);
            const end = new Date(booking.checkOutDate);
            console.log(start, end, booking);
            for (
              let date = new Date(start);
              date <= end;
              date.setDate(date.getDate() + 1)
            ) {
              bookedDates.push(new Date(date));
              if (date.toDateString() === today.toDateString()) {
                isBookedToday = true;
              }
            }
          });

          if (isAvailableToday) {
            this.availableToday++;
          }
          if (isBookedToday) {
            this.bookedToday++;
          }

          if (property.averageRating) {
            totalRating += property.averageRating;
            ratedProperties++;
          }
        });

        this.averageRating =
          ratedProperties > 0 ? totalRating / ratedProperties : 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.properties = [];
        this.error = this.getErrorMessage(err.status);
        this.loading = false;

        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 401:
        return 'Please login to view your properties';
      case 404:
        return 'No properties found';
      default:
        return 'Failed to load dashboard data. Please try again later.';
    }
  }

  navigateToAddProperty(): void {
    this.router.navigate(['/host/properties/add']);
  }

  navigateToEditProperty(propertyId: number): void {
    this.router.navigate(['/host/properties/edit', propertyId]);
  }

  navigateToViewProperty(propertyId: number): void {
    this.router.navigate(['/host/properties/view', propertyId]);
  }
  navigateToBookedProperties() {
    this.router.navigate(['/host/BookedPropeties/view']);
  }
  navigateToavailableProperties() {
    this.router.navigate(['/host/AvailablePropeties/view']);
  }
  deleteProperty(propertyId: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      if (this.totalProperties > 0) this.totalProperties--;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.properties.forEach((property) => {
        let isAvailableToday = false;
        let isBookedToday = false;
        const availableDates: Date[] = [];
        let ratedProperties = 0;
        const bookedDates: Date[] = [];
        if (property.id == propertyId) {
          property.availabilities?.forEach((av) => {
            const start = new Date(av.startDate);
            const end = new Date(av.endDate);

            for (
              let date = new Date(start);
              date <= end;
              date.setDate(date.getDate() + 1)
            ) {
              availableDates.push(new Date(date));
              if (date.toDateString() === today.toDateString()) {
                isAvailableToday = true;
              }
            }
          });

          property.bookings?.forEach((booking) => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);

            for (
              let date = new Date(start);
              date <= end;
              date.setDate(date.getDate() + 1)
            ) {
              bookedDates.push(new Date(date));
              if (date.toDateString() === today.toDateString()) {
                isBookedToday = true;
              }
            }
          });

          if (isAvailableToday) {
            this.availableToday--;
          }
          if (isBookedToday) {
            this.bookedToday--;
          }

          if (property.averageRating) {
            this.averageRating ?? 0;
            this.averageRating! -= property.averageRating;
            ratedProperties--;
          }
          this.averageRating =
            ratedProperties > 0 ? this.averageRating ?? 0 / ratedProperties : 0;
        }
      });
    }

    this.loading = true;

    this.propertyService.deleteProperty(propertyId.toString()).subscribe({
      next: () => {
        this.properties = this.properties.filter((p) => p.id !== propertyId);
        this.totalProperties = this.properties.length;
        this.notification.add({
          severity: 'success',
          summary: 'Property Deleted',
          detail: 'Property deleted successfully',
        });
      },
      error: (err) => {
        if (err.status === 404) {
          this.notification.add({
            severity: 'error',
            summary: 'Property Can not Deleted',
            detail:
              'Cannot delete property: There are existing bookings for this property',
          });
        } else {
          this.notification.add({
            severity: 'error',
            summary: 'Error deleting property',
            detail: 'Failed to delete property. Please try again',
          });
        }
      },
    });
  }
}
