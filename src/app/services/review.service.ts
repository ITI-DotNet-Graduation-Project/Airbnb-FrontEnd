import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/property.model';
import { CreateReview } from '../models/review.models';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://airbnbclone.runasp.net/api';

  constructor(private http: HttpClient) {}

  getReviewsForProperty(propertyId: number) {
    return this.http.get<Review[]>(
      `${this.apiUrl}/Reviews/property/${propertyId}`
    );
  }

  addReview(review: CreateReview) {
    return this.http.post<Review>(`${this.apiUrl}/Reviews`, review);
  }

  getAverageRating(propertyId: number) {
    return this.http.get<number>(
      `${this.apiUrl}/Reviews/property/${propertyId}/average-rating`
    );
  }
}
