import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-price',
  templateUrl: './card-price.component.html',
  styleUrl: './card-price.component.css',
})
export class CardPriceComponent {
  @Input() price: number = 0;
  @Input() numNights: number = 1;
  @Input() pricePerNight: number = 0;

  get formattedPrice(): string {
    return this.price.toLocaleString('en-EG', {
      style: 'currency',
      currency: 'EGP',
    });
  }

  get priceText(): string {
    return this.numNights > 1
      ? `${this.formattedPrice} total`
      : `${this.formattedPrice} night`;
  }
}
