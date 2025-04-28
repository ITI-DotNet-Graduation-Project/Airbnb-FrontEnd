import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../AuthService/auth-service.service';
import { forkJoin, switchMap } from 'rxjs';
import { DefaultNavComponent } from '../../default-nav/default-nav.component';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [
    CommonModule,
    ImageGalleryComponent,
    FormsModule,
    DatePipe,
    DefaultNavComponent,
  ],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
  providers: [DatePipe],
})
export class PropertyDetailsComponent implements OnInit {
  property: any;
  isLoading = true;
  error: string | null = null;
  numNights = 1;
  totalPrice = 0;
  isBookedToday: boolean = false;
  today: string;
  bookedDates: Date[] = [];
  isLoadingCalendar: boolean = false;
  calendarError: string | null = null;
  hoverRating: number = 0;
  hasBookedThisProperty: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private bookingService: BookingService,
    private router: Router,
    private propertyService: PropertyService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookingData.propertyId = Number.parseInt(id);
      this.loadPropertyDetails(+id);
      this.loadBookedDates(+id);
      this.checkUserBookings(+id);
      this.loadReviews(+id);
    }
  }

  currentDate = new Date();
  calendarDays: any[] = [];

  loadPropertyDetails(id: number): void {
    this.isLoading = true;
    this.propertyService
      .getPropertyById(id.toString())
      .pipe(
        switchMap((property) => {
          this.property = property;
          console.log(property);
          return forkJoin([
            this.loadBookedDates(id),
            this.loadReviews(id),
            this.loadAverageRating(id),
          ]);
        })
      )
      .subscribe({
        next: () => {
          this.checkBookingStatus();
          this.calculateStayDetails();
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load property details';
          this.isLoading = false;
        },
      });
  }

  loadBookedDates(propertyId: number) {
    this.isLoadingCalendar = true;
    this.calendarError = null;

    this.bookingService.getBookedDates(propertyId).subscribe({
      next: (dates) => {
        this.bookedDates = dates.map((dateStr: string) => new Date(dateStr));
        this.checkBookingStatus();
        this.generateCalendar();
        this.isLoadingCalendar = false;
      },
      error: (err) => {
        this.calendarError = 'Failed to load availability data';
        this.isLoadingCalendar = false;
        console.error('Error loading booked dates:', err);
      },
    });
  }

  loadReviews(propertyId: number): void {
    this.reviewService.getReviewsForProperty(propertyId).subscribe({
      next: (reviews) => {
        console.log(reviews);
        this.property.reviews = reviews.map((review) => ({
          ...review,
          userName: review.userName || 'Anonymous',
          rating: review.rating || 0,
          comment: review.comment || 'No comment provided',
          avatarColor: this.getRandomColor(),
          avatarInitial: review.userName?.charAt(0) || 'A',
        }));
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.property.reviews = [];
      },
    });
  }

  private getRandomColor(): string {
    const colors = [
      '#FF5733',
      '#33FF57',
      '#3357FF',
      '#F333FF',
      '#33FFF3',
      '#FF33A1',
      '#A133FF',
      '#33FFA1',
      '#FF8C33',
      '#338CFF',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  loadAverageRating(propertyId: number): void {
    this.reviewService.getAverageRating(propertyId).subscribe({
      next: (average) => {
        this.property.averageRating = average || 0;
        console.log('average', this.property.averageRating);
      },
      error: (err) => {
        console.error('Error loading average rating:', err);
      },
    });
  }

  checkUserBookings(propertyId: number): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.bookingService.getUserBookings(userId).subscribe({
      next: (bookings) => {
        console.log(bookings);

        this.hasBookedThisProperty = bookings.some((b) => {
          const isCompleted =
            b.propertyId === propertyId &&
            new Date(b.checkOutDate) < new Date();
          console.log(
            'property match:',
            b.propertyId === propertyId,
            'completed:',
            new Date(b.checkOutDate) < new Date(),
            'combined:',
            isCompleted
          );
          return isCompleted;
        });

        console.log('hasBookedThisProperty:', this.hasBookedThisProperty);
      },
      error: (err) => {
        console.error('Error checking user bookings:', err);
      },
    });
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    this.calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push({});
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = this.isSameDay(date, new Date());
      const isBooked = this.isDateBooked(date);
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

      this.calendarDays.push({
        date,
        isToday,
        isBooked,
        isPast,
        isAvailable: !isBooked && !isPast,
      });
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isDateBooked(date: Date): boolean {
    return this.bookedDates.some((bookedDate) =>
      this.isSameDay(bookedDate, date)
    );
  }

  get currentMonth(): string {
    return this.currentDate.toLocaleDateString('default', {
      month: 'long',
      year: 'numeric',
    });
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  checkBookingStatus(): void {
    if (!this.bookedDates || this.bookedDates.length === 0) {
      this.isBookedToday = false;
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.isBookedToday = this.bookedDates.some((bookedDate) => {
      const dateToCheck =
        typeof bookedDate === 'string'
          ? new Date(bookedDate)
          : new Date(bookedDate.getTime());

      dateToCheck.setHours(0, 0, 0, 0);

      return dateToCheck.getTime() === today.getTime();
    });
  }

  calculateStayDetails(): void {
    if (!this.property) return;

    if (
      this.property.availabilities &&
      this.property.availabilities.length > 0
    ) {
      const availability = this.property.availabilities[0];
      const start = new Date(availability.startDate);
      const end = new Date(availability.endDate);
      this.numNights = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
    }

    this.totalPrice = this.property.price * this.numNights;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  showReviewForm = false;
  newReview = {
    rating: 0,
    comment: '',
    propertyId: 0,
    bookingId: 0,
  };

  openReviewForm(): void {
    if (!this.hasBookedThisProperty) {
      alert('You must have a completed booking to review this property');
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.bookingService.getUserBookings(userId).subscribe((bookings) => {
      const validBooking = bookings.find(
        (b) =>
          b.propertyId === this.property.id &&
          new Date(b.checkOutDate) < new Date()
      );

      if (validBooking) {
        this.newReview.propertyId = this.property.id;
        this.newReview.bookingId = validBooking.id;
        console.log('foocus', this.newReview.bookingId);
        this.showReviewForm = true;
      } else {
        alert('You must have a completed booking to review this property');
      }
    });
  }

  cancelReview(): void {
    this.showReviewForm = false;
    this.newReview = {
      rating: 0,
      comment: '',
      propertyId: this.property.id,
      bookingId: 0,
    };
  }

  setRating(rating: number): void {
    this.newReview.rating = rating;
  }

  submitReview(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    console.log('Submitting review:', this.newReview);
    this.reviewService.addReview(this.newReview).subscribe({
      next: (review) => {
        this.property.reviews = this.property.reviews || [];
        this.property.reviews.unshift(review);
        this.loadAverageRating(this.property.id);
        this.showReviewForm = false;
        this.newReview = {
          rating: 0,
          comment: '',
          propertyId: this.property.id,
          bookingId: 0,
        };
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        alert(
          err.error?.message || 'Error submitting review. Please try again.'
        );
      },
    });
  }

  bookingData = {
    checkInDate: '',
    checkOutDate: '',
    propertyId: 0,
    guests: 1,
  };

  bookingError = '';
  isBooking = false;

  calculateNights(): number {
    if (!this.bookingData.checkInDate || !this.bookingData.checkOutDate)
      return 0;

    const start = new Date(this.bookingData.checkInDate);
    const end = new Date(this.bookingData.checkOutDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  calculateSubtotal(): number {
    return this.property.price * this.calculateNights();
  }

  calculateTotalPrice(): number {
    return this.calculateSubtotal();
  }

  validateDates(): void {
    if (this.bookingData.checkInDate && this.bookingData.checkOutDate) {
      const start = new Date(this.bookingData.checkInDate);
      const end = new Date(this.bookingData.checkOutDate);
      const today = new Date(new Date().setHours(0, 0, 0, 0));

      if (start >= end) {
        this.bookingError = 'Check-out date must be after check-in date';
      } else if (start < today) {
        this.bookingError = 'Check-in date cannot be in the past';
      } else if (this.isDateBooked(start) || this.isDateBooked(end)) {
        this.bookingError = 'Selected dates include booked dates';
      } else {
        // Check if any date in the range is booked
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          if (this.isDateBooked(new Date(d))) {
            this.bookingError = 'Selected dates include booked dates';
            break;
          }
        }

        if (!this.bookingError) {
          this.bookingError = '';
        }
      }
    }
  }
  isBookingValid() {
    return (
      this.bookingData.checkInDate &&
      this.bookingData.checkOutDate &&
      !this.bookingError &&
      !this.isBooking
    );
  }

  async submitBooking(): Promise<void> {
    if (!this.isBookingValid()) return;

    this.isBooking = true;
    this.bookingError = '';

    try {
      const bookingRequest = {
        checkInDte: new Date(this.bookingData.checkInDate).toISOString(),
        checkOutDate: new Date(this.bookingData.checkOutDate).toISOString(),
        propertyId: this.bookingData.propertyId,
        guests: this.bookingData.guests,
      };

      const booking = await this.bookingService
        .createBooking(bookingRequest)
        .toPromise();
      this.router.navigate(['/booking-confirmation', booking?.id]);
    } catch (error) {
      this.bookingError =
        error.error?.message || 'Failed to complete booking. Please try again.';
    } finally {
      this.isBooking = false;
    }
  }
}
