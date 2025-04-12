import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.css'],
})
export class CardImageComponent implements OnInit {
  @Input() images: string[] = [];

  currentIndex: number = 0;
  currentImage: string = '';

  ngOnInit(): void {
    this.currentImage = this.images[0];
    console.log(this.currentImage);
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.currentImage = this.images[this.currentIndex];
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentImage = this.images[this.currentIndex];
    }
  }

  get showPrevButton(): boolean {
    return this.currentIndex > 0;
  }

  get showNextButton(): boolean {
    return this.currentIndex < this.images.length - 1;
  }

  goToImage(index: number): void {
    this.currentIndex = index;
    this.currentImage = this.images[this.currentIndex];
  }
}
