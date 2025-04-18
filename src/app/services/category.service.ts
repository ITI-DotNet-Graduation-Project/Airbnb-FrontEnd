import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private selectedCategoryIdSource = new BehaviorSubject<number | null>(null);

  selectedCategoryId$ = this.selectedCategoryIdSource.asObservable();

  changeCategory(categoryId: number) {
    this.selectedCategoryIdSource.next(categoryId);
  }
}
