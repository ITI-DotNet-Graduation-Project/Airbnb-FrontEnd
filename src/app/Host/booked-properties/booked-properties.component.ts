import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { Router } from '@angular/router';
import { HeaderHostComponent } from '../HostHeader/hostHeader.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booked-properties',
  standalone: true,
  imports: [
    CommonModule,
    PropertyCardComponent,
    HeaderHostComponent,
    FormsModule,
  ],
  templateUrl: './booked-properties.component.html',
  styleUrls: ['./booked-properties.component.css'],
})
export class BookedPropertiesComponent implements OnInit {
  properties: any[] = [];
  loading: boolean = true;
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookedProperties();
  }

  loadBookedProperties(): void {
    this.loading = true;
    this.propertyService.getHostProperties().subscribe({
      next: (response: any) => {
        console.log(response.properties);
        this.properties = this.filterBookedProperties(response.properties);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading properties:', err);
        this.loading = false;
      },
    });
  }

  filterBookedProperties(properties: any[]): any[] {
    return properties.filter((property) => {
      return property.bookings?.some((booking: any) => {
        const start = new Date(booking.checkInDte);
        const end = new Date(booking.checkOutDate);
        const checkDate = new Date(this.selectedDate);
        return checkDate >= start && checkDate <= end;
      });
    });
  }

  onDateChange(newDate: string): void {
    this.selectedDate = newDate;
    this.loadBookedProperties();
  }

  navigateToDetails(propertyId: number): void {
    this.router.navigate(['/host/properties', propertyId]);
  }
}
