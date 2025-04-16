import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css',
})
export class HostDashboardComponent {
  totalProperties: number = 0;
  activeBookings: number = 0;
  properties: any = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.error = null;

    this.propertyService.getHostProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        console.log(properties);
        this.totalProperties = this.properties.length;
        this.loading = false;
      },

      error: (err) => {
        if (err.status === 401) {
          this.error = 'Please login to view your properties';
          this.router.navigate(['/login']);
        } else if (err.status === 404) {
          this.error = 'No properties found';
        } else {
          this.error = 'Failed to load properties. Please try again later.';
        }
        this.loading = false;
      },
    });
  }

  navigateToAddProperty() {
    this.router.navigate(['/host/properties/add']);
  }

  navigateToEditProperty(propertyId: string) {
    this.router.navigate(['/host/properties/edit', propertyId]);
  }

  navigateToViewProperty(propertyId: string) {
    this.router.navigate(['/host/properties/view', propertyId]);
  }

  deleteProperty(propertyId: string) {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(propertyId).subscribe({
        next: () => {
          this.properties = this.properties.filter((p) => p.id !== propertyId);
          this.totalProperties--;
        },
        error: (err) => {
          console.error('Error deleting property:', err);
          alert('Failed to delete property. Please try again.');
        },
      });
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
