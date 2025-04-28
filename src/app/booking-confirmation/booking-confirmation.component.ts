import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css',
})
export class BookingConfirmationComponent {
  booking: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    this.loadBooking(bookingId!);
  }

  loadBooking(id: string): void {
    this.bookingService.getBookingById(id).subscribe({
      next: (booking) => {
        console.log(booking);
        this.booking = booking;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading booking:', err);
        this.isLoading = false;
      },
    });
  }
}
