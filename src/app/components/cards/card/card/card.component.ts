import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardImageComponent } from '../card-image/card-image.component';
import { CardPriceComponent } from '../card-price/card-price.component';
import { CardService } from '../../../../services/card.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  cards: any[] = [];
  isLoading = true;
  error: string | null = null;
  currentPage = 1;
  selectedCategoryId: number | null = null;
  constructor(
    private cardService: CardService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.selectedCategoryId$.subscribe((id) => {
      console.log('from card section', id);
      this.selectedCategoryId = id;
      this.loadCards(id);
    });
  }

  loadCards(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.cardService.getCards(id).subscribe({
      next: (data) => {
        this.cards = data.map((card) => ({
          ...card,
          totalPrice: this.calculateTotalPrice(card),
          numNights: this.calculateNumNights(card),
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load properties. Please try again later.';
        this.isLoading = false;
        console.error('Error loading cards:', err);
      },
    });
  }

  loadMore(): void {
    this.currentPage++;
    this.cardService.getCardsPaginated(this.currentPage).subscribe({
      next: (newCards) => {
        this.cards = [
          ...this.cards,
          ...newCards.map((card) => ({
            ...card,
            totalPrice: this.calculateTotalPrice(card),
            numNights: this.calculateNumNights(card),
          })),
        ];
      },
      error: (err) => {
        console.error('Error loading more cards:', err);
      },
    });
  }

  calculateNumNights(card: any): number {
    if (!card.availabilities || card.availabilities.length === 0) return 1;
    const availability = card.availabilities[0];
    const start = new Date(availability.startDate);
    const end = new Date(availability.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  calculateTotalPrice(card: any): number {
    return card.price * this.calculateNumNights(card);
  }

  navigateToDetails(cardId: number): void {
    this.router.navigate(['/properties', cardId]);
  }
}
