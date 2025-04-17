import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';

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
}

interface HostDashboardResponse {
  availableTodayCount: number;
  bookedTodayCount: number;
  overallAverageRating: number | null;
  properties: Property[];
  totalProperties: number;
}

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    this.propertyService.getHostProperties().subscribe({
      next: (response: HostDashboardResponse) => {
        this.properties = response.properties || [];
        this.totalProperties = response.totalProperties || 0;
        this.availableToday = response.availableTodayCount || 0;
        this.bookedToday = response.bookedTodayCount || 0;
        this.averageRating = response.overallAverageRating;
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

  deleteProperty(propertyId: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(propertyId.toString()).subscribe({
        next: () => {
          this.properties = this.properties.filter((p) => p.id !== propertyId);
          this.totalProperties = this.properties.length;
          alert('Property deleted successfully.');
        },
        error: (err) => {
          if (err.status === 404) {
            alert(
              'Cannot delete property: There are existing bookings for this property.'
            );
          } else {
            console.error('Error deleting property:', err);
            alert('Failed to delete property. Please try again.');
          }
        },
      });
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
