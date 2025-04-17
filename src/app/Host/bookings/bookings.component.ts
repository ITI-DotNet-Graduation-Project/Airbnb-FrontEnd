import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Booking } from '../../models/booking.model';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  filter: 'all' | 'upcoming' | 'past' = 'all';
  loading = true;
  error: string | null = null;

  constructor(
    private propertyService: PropertyService // private modalService: NgbModal,
  ) // private toastr: ToastrService
  {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.error = null;

    // this.propertyService.getBookingsByHost().subscribe({
    //   next: (bookings) => {
    //     this.bookings = bookings;
    //     this.applyFilter();
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.error = 'Failed to load bookings. Please try again later.';
    //     this.loading = false;
    //     this.toastr.error('Failed to load bookings', 'Error');
    //   },
    // });
  }

  applyFilter(): void {
    const now = new Date();
    this.filteredBookings = this.bookings.filter((booking) => {
      if (this.filter === 'upcoming')
        return new Date(booking.checkInDate) > now;
      if (this.filter === 'past') return new Date(booking.checkOutDate) <= now;
      return true;
    });
  }

  viewGuestDetails(guestId: string): void {
    // Implement navigation to guest details or show in modal
    // this.toastr.info('Guest details would be shown here');
  }

  openMessageModal(guestId: string, guestName: string): void {
    // const modalRef = this.modalService.open(MessageModalComponent, {
    //   size: 'lg',
    // });
    // modalRef.componentInstance.recipientId = guestId;
    // modalRef.componentInstance.recipientName = guestName;
    // modalRef.result.then(
    //   (result) => {
    //     if (result === 'message_sent') {
    //       this.toastr.success('Message sent successfully');
    //     }
    //   },
    //   (reason) => {
    //     // Dismissed
    //   }
    // );
  }
}
