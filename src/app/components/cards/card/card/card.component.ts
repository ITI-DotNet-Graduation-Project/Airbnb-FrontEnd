import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardImageComponent } from '../card-image/card-image.component';
import { CardPriceComponent } from '../card-price/card-price.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  cards = [
    {
      images: [
        '../../../../assets/Finalproject/Card1/1.jpeg',
        '../../../../assets/Finalproject/Card1/2.jpeg',
        '../../../../assets/Finalproject/Card1/3.jpeg',
        '../../../../assets/Finalproject/Card1/4.jpeg',
      ],

      location: 'Batroun, Lebanon',
      rating: 4.96,
      distance: '623 kilometers away',
      date: 'Apr 27 – May 2',

      price: '42,128 ج.م ',
      numNights: 'for 5 nights',
    },
    {
      images: [
        '../../../../assets/Finalproject/Card2/1.jpg',
        '../../../../assets/Finalproject/Card2/2.jpg',
        '../../../../assets/Finalproject/Card2/3.jpg',
        '../../../../assets/Finalproject/Card2/4.jpg',
      ],
      location: 'Rhodes, Greece',
      rating: 4.96,
      distance: 'Zefyros Strand',
      date: 'Oct 4 - 9',

      price: '20,875 ج.م ',
      numNights: 'for 3 nights',
    },
    {
      images: [
        '../../../../assets/Finalproject/Card3/1.jpeg',
        '../../../../assets/Finalproject/Card3/2.jpeg',
        '../../../../assets/Finalproject/Card3/3.jpeg',
        '../../../../assets/Finalproject/Card3/4.jpeg',
      ],
      location: 'Koutsouras, Greece',
      rating: 4.96,
      distance: 'Makrygialos-Lagoufa',
      date: 'May 1 - 6',
      price: '33,401 ج.م ',
      numNights: 'for 4 nights',
    },
    {
      images: [
        '../../../../assets/Finalproject/Card4/1.jpg',
        '../../../../assets/Finalproject/Card4/2.jpg',
        '../../../../assets/Finalproject/Card4/3.jpg',
        '../../../../assets/Finalproject/Card4/4.jpg',
      ],
      location: 'Dahab, Egypt',
      rating: 4.96,
      distance: 'Asala Open Beach',
      date: 'May 15 - 20',
      price: '43,708ج.م ',
      numNights: 'for 2 nights',
    },

    {
      images: [
        '../../../../assets/Finalproject/Card1/1.jpeg',
        '../../../../assets/Finalproject/Card1/2.jpeg',
        '../../../../assets/Finalproject/Card1/3.jpeg',
        '../../../../assets/Finalproject/Card1/4.jpeg',
      ],

      location: 'Batroun, Lebanon',
      rating: 4.96,
      distance: '623 kilometers away',
      date: 'Apr 27 – May 2',

      price: '42,128 ج.م ',
      numNights: 'for 5 nights',
    },
    {
      images: [
        '../../../../assets/Finalproject/Card2/1.jpg',
        '../../../../assets/Finalproject/Card2/2.jpg',
        '../../../../assets/Finalproject/Card2/3.jpg',
        '../../../../assets/Finalproject/Card2/4.jpg',
      ],
      location: 'Rhodes, Greece',
      rating: 4.96,
      distance: 'Zefyros Strand',
      date: 'Oct 4 - 9',

      price: '20,875 ج.م ',
      numNights: 'for 3 nights',
    },
    {
      images: [
        '../../../../assets/Finalproject/Card3/1.jpeg',
        '../../../../assets/Finalproject/Card3/2.jpeg',
        '../../../../assets/Finalproject/Card3/3.jpeg',
        '../../../../assets/Finalproject/Card3/4.jpeg',
      ],
      location: 'Koutsouras, Greece',
      rating: 4.96,
      distance: 'Makrygialos-Lagoufa',
      date: 'May 1 - 6',
      price: '33,401 ج.م ',
      numNights: 'for 4 nights',
    },
    {
      images: [
        '../../../../assets/Finalproject/Card4/1.jpg',
        '../../../../assets/Finalproject/Card4/2.jpg',
        '../../../../assets/Finalproject/Card4/3.jpg',
        '../../../../assets/Finalproject/Card4/4.jpg',
      ],
      location: 'Dahab, Egypt',
      rating: 4.96,
      distance: 'Asala Open Beach',
      date: 'May 15 - 20',
      price: '43,708ج.م ',
      numNights: 'for 2 nights',
    },
  ];
}
