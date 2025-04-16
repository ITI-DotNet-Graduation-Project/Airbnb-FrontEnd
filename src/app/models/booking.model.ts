export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}
