export interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  bookingDate: string;
  propertyId: number;
  guests: number;
}

export interface BookingRequest {
  checkInDte: string;
  checkOutDate: string;
  propertyId: number;
  guests: number;
}
