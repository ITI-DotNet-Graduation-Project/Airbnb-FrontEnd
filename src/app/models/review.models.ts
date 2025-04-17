export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: Date;
  propertyId: number;
  userId: number;
  userName: string;
}

export interface CreateReview {
  rating: number;
  comment: string;
  propertyId: number;
  bookingId: number;
}

export interface PropertyWithReviews {
  id: number;
  averageRating: number;
  reviews: Review[];
}
