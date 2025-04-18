import { Component } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  favoriteCards: any[] = [];
  isLoading = false;

  constructor(
    private favoriteService: FavoriteService,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.isLoading = true;
    this.favoriteCards = [];

    const favorites = this.favoriteService.getAllFavorites();
    const favoriteIds = Object.keys(favorites).filter((id) => favorites[id]);

    if (favoriteIds.length === 0) {
      this.isLoading = false;
      return;
    }

    let completedRequests = 0;

    favoriteIds.forEach((id) => {
      this.propertyService.getPropertyById(id).subscribe({
        next: (property) => {
          this.favoriteCards.push(property);
        },
        error: (err) => {
          console.error(`Failed to load property ${id}:`, err);
        },
        complete: () => {
          completedRequests++;

          if (completedRequests === favoriteIds.length) {
            this.isLoading = false;
          }
        },
      });
    });
  }

  goToDetails(cardId: string | number) {
    this.router.navigate(['/properties', cardId.toString()]);
  }
}
