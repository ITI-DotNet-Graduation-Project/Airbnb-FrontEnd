import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-booking-card',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './room-booking-card.component.html',
  styleUrl: './room-booking-card.component.css',
})
export class RoomBookingCardComponent {
  @Input() price: number = 151828;
  @Input() nights: number = 7;
  @Input() checkInDate: Date = new Date(2025, 6, 28);
  @Input() checkOutDate: Date = new Date(2025, 7, 4);
  @Input() guests: number = 1;

  @Output() reserve = new EventEmitter<void>();

  onReserve() {
    this.reserve.emit();
  }
}
