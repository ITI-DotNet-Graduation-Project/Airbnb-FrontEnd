export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  categoryDescription: string;
  categoryId: number;
  propertyImages: PropertyImage[];
  averageRating?: number;
  reviews?: Review[];
  maxGuest: number;
  availabilities: any[];
  hostId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
