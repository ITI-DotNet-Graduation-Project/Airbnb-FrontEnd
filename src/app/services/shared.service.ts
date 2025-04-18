import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedCategory = new BehaviorSubject<number | null>(null);
  currentCategory = this.selectedCategory.asObservable();

  changeCategory(categoryId: number | null) {
    this.selectedCategory.next(categoryId);
  }
}
