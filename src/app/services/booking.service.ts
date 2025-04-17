import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking, BookingRequest } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'https://localhost:7042/api';

  constructor(private http: HttpClient) {}

  createBooking(bookingData: BookingRequest) {
    return this.http.post<Booking>(`${this.apiUrl}/Bookings`, bookingData);
  }

  getBookingById(id: string) {
    return this.http.get<Booking>(`${this.apiUrl}/Bookings/${id}`);
  }

  getBookedDates(propertyId: number) {
    return this.http.get<string[]>(
      `${this.apiUrl}/Bookings/${propertyId}/booked-dates`
    );
  }
  getUserBookings(userId: number) {
    return this.http.get<Booking[]>(`${this.apiUrl}/Users/user/${userId}`);
  }
}
