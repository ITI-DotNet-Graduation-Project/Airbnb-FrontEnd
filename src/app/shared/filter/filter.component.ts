import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  priceRange = {
    min: 510,
    max: 18000,
  };

  sliderOptions: Options = {
    floor: 0,
    ceil: 18000,
    step: 100,
    translate: (value: number): string => {
      return `${value} EGP`;
    },
  };

  // minPrice: number = 0;
  // maxPrice: number = 18000;

  // priceRange = {
  //   min: 510,
  //   max: 18000
  // };

  onPriceChange() {
    if (this.priceRange.min > this.priceRange.max) {
      [this.priceRange.min, this.priceRange.max] = [
        this.priceRange.max,
        this.priceRange.min,
      ];
    }
  }
  bedrooms = 0;
  beds = 0;
  bathrooms = 0;

  increment(field: 'bedrooms' | 'beds' | 'bathrooms') {
    if (this[field] < 8) {
      this[field]++;
    }
  }

  decrement(field: 'bedrooms' | 'beds' | 'bathrooms') {
    if (this[field] > 1) {
      this[field]--;
    } else {
      this[field] = 0;
    }
  }

  displayValue(value: number): string {
    return value === 0 ? 'Any' : `${value}+`;
  }
}
