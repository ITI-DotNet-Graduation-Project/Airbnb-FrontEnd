import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardPriceComponent } from './card-price/card-price.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardComponent,
    CardImageComponent,
    CardDetailsComponent,
  ],
  exports: [CardComponent, CardImageComponent, CardDetailsComponent],
})
export class CardModule {}
