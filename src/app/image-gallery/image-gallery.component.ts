import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent {
  @Input() images: any[] = [];
  currentIndex = 0;

  get currentImage(): string {
    return this.images.length > 0
      ? `https://localhost:7042/images/properties/${
          this.images[this.currentIndex].imageUrl
        }`
      : '';
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  selectImage(index: number): void {
    this.currentIndex = index;
  }
}
