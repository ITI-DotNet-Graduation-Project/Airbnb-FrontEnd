import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { Router } from '@angular/router';
import { HeaderHostComponent } from '../HostHeader/hostHeader.component';
import { FormsModule } from '@angular/forms';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-available-properties',
  standalone: true,
  imports: [
    CommonModule,
    PropertyCardComponent,
    HeaderHostComponent,
    FormsModule,
  ],
  templateUrl: './available-properties.component.html',
  styleUrls: ['./available-properties.component.css'],
})
export class AvailablePropertiesComponent implements OnInit {
  properties: any[] = [];
  loading: boolean = true;
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAvailableProperties();
  }

  loadAvailableProperties(): void {
    this.loading = true;
    this.propertyService.getHostProperties().subscribe({
      next: (response: any) => {
        console.log(response.properties);
        this.properties = this.filterAvailableProperties(response.properties);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading properties:', err);
        this.loading = false;
      },
    });
  }

  filterAvailableProperties(properties: any[]): any[] {
    const checkDate = new Date(this.selectedDate);
    checkDate.setUTCHours(0, 0, 0, 0);

    return properties.filter((property) => {
      if (!property.availabilities?.length) return false;

      return (
        property.availabilities.some((av: any) => {
          try {
            const start = new Date(av.startDate);
            start.setUTCHours(0, 0, 0, 0);

            const end = new Date(av.endDate);
            end.setUTCHours(0, 0, 0, 0);

            console.log('Checking availability:', {
              checkDate: checkDate.toISOString(),
              start: start.toISOString(),
              end: end.toISOString(),
              selected: this.selectedDate,
            });

            return checkDate >= start && checkDate <= end;
          } catch (e) {
            console.error('Invalid date format in availability', e);
            return false;
          }
        }) && !this.isPropertyBooked(property, checkDate)
      );
    });
  }

  private isPropertyBooked(property: any, checkDate: Date): boolean {
    if (!property.bookings?.length) return false;

    return property.bookings.some((booking: any) => {
      try {
        const start = new Date(booking.checkInDate);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(booking.checkOutDate);
        end.setUTCHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);

        return checkDate >= start && checkDate <= end;
      } catch (e) {
        console.error('Invalid date format in booking', e);
        return false;
      }
    });
  }

  onDateChange(newDate: string): void {
    this.selectedDate = newDate;
    this.loadAvailableProperties();
  }

  navigateToDetails(propertyId: number): void {
    this.router.navigate(['/host/properties', propertyId]);
  }
}
