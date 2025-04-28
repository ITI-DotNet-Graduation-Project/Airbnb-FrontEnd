import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  id: string;
  quantity: number;
  // Add other item properties as needed
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(item: CartItem) {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.cartSubject.next([...currentCart]);
  }

  removeFromCart(itemId: string) {
    const currentCart = this.cartSubject.value.filter(
      (item) => item.id !== itemId
    );
    this.cartSubject.next(currentCart);
  }

  clearCart() {
    this.cartSubject.next([]);
  }
}
