import { Component, Input, OnInit } from '@angular/core';
import { FavoriteService } from '../../../../services/favorite.service';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.css'],
})
export class CardImageComponent implements OnInit {
  @Input() images: any[] = [];
  currentIndex: number = 0;
  currentImage: string = '';
  baseImageUrl = 'https://localhost:7042/images/properties/';
  @Input() cardId!: number;
  isLiked = false;

  constructor(private favoriteService: FavoriteService) {}

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.favoriteService.setFavorite(this.cardId, this.isLiked);
  }
  ngOnInit(): void {
    if (this.images && this.images.length > 0) {
      this.currentImage = this.getFullImageUrl(this.images[0]);
    }
    this.isLiked = this.favoriteService.getFavorite(this.cardId);
  }

  private getImageUrl(image: any): string {
    return typeof image === 'string' ? image : image.imageUrl;
  }

  private getFullImageUrl(image: any): string {
    const imagePath = this.getImageUrl(image);
    return `${this.baseImageUrl}${imagePath}`;
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.currentImage = this.getFullImageUrl(this.images[this.currentIndex]);
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentImage = this.getFullImageUrl(this.images[this.currentIndex]);
    }
  }

  get showPrevButton(): boolean {
    return this.currentIndex > 0;
  }

  get showNextButton(): boolean {
    return this.currentIndex < this.images.length - 1;
  }

  goToImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.currentImage = this.getFullImageUrl(this.images[this.currentIndex]);
    }
  }
}
