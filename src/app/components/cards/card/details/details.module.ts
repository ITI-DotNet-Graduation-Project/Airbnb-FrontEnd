import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { RoomBookingCardComponent } from './room-booking-card/room-booking-card.component';
import { CardDetailsPageComponent } from './card-details-page/card-details-page.component';

@NgModule({
  declarations: [RoomBookingCardComponent, CardDetailsPageComponent],
  imports: [CommonModule],
  exports: [RoomBookingCardComponent, CardDetailsPageComponent],
})
export class DetailsModule {}
