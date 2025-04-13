import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomBookingCardComponent } from '../room-booking-card/room-booking-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-details-page',

  templateUrl: './card-details-page.component.html',
  styleUrls: ['./card-details-page.component.css'],
})
export class CardDetailsPageComponent implements OnInit {
  @Input() reviewCount: number = 442;
  @Input() overallRating: number = 4.99;
  mainImage: string = '../../../../assets/Finalproject/Card1/1.jpeg';
  smallImages: string[] = [
    '../../../../assets/Finalproject/Card1/2.jpeg',
    '../../../../assets/Finalproject/Card1/3.jpeg',
    '../../../../assets/Finalproject/Card1/4.jpeg',
    '../../../../assets/Finalproject/Card1/5.jpeg',
  ];

  checkInDate = new Date(2025, 6, 28);
  checkOutDate = new Date(2025, 7, 4);

  ngOnInit(): void {
    console.log('this.smallImages');
  }

  onReserve() {
    console.log('You click Book!!!');
  }
}
