// import { Component,  OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';


// @Component({
//   selector: 'app-page-results',
//   // standalone: true,
//   // imports: [],
//   templateUrl: './page-results.component.html',
//   styleUrl: './page-results.component.css'
// })
// export class PageResultsComponent implements OnInit{
//   searchQuery: string = '';
//   cards = [
//     { name: 'Lake View Apartment', price: 200 },
//     { name: 'Cozy Loft Flat', price: 150 },
//     { name: 'Historical Apartment', price: 300 },
//     { name: 'Cairo Downtown Studio', price: 250 }
//   ];
//   filteredCards = [];

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void 
//   {
//     this.route.queryParams.subscribe(params => {
//       this.searchQuery = (params['q'] || '').toLowerCase();
//       this.filterCards();
//     });
//   }

//   filterCards() 
//   {
//     const query = this.searchQuery.trim().toLowerCase();
//     this.filteredCards = this.cards.filter(card =>
//       card.name.toLowerCase().includes(this.searchQuery)
//     );
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { CardImageComponent } from '../cards/card/card-image/card-image.component';
import { CardDetailsComponent } from '../cards/card/card-details/card-details.component';
import { CardPriceComponent } from '../cards/card/card-price/card-price.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-results',
  templateUrl: './page-results.component.html',
  styleUrls: ['./page-results.component.css']
})
export class PageResultsComponent implements OnInit {
  searchQuery: string = '';
  cards: any[] = [];
  filteredCards: any[] = [];

  constructor(private route: ActivatedRoute, private cardService: CardService) {}

  ngOnInit(): void {
    
    this.cards = this.cardService.getCards();
    
    console.log('Cards:', this.cards);
    
    this.route.queryParams.subscribe(params => {
      this.searchQuery = (params['q'] || '').toLowerCase();
      this.filterCards();
    });
  }

  filterCards(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredCards = this.cards.filter(card =>
      card.location.toLowerCase().includes(query)
    );
    console.log('Filtered Cards:', this.filteredCards); 
  }
}