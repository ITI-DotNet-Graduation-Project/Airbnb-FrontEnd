import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardPriceComponent } from './card-price/card-price.component';
import { DetailsModule } from './details/details.module';

@NgModule({
  declarations: [
    CardComponent,
    CardImageComponent,
    CardDetailsComponent,
    CardPriceComponent,
  ],
  imports: [CommonModule],
  exports: [
    CardComponent,
    CardImageComponent,
    CardDetailsComponent,
    CardPriceComponent,
  ],
})
export class CardModule {}
