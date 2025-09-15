import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITrack } from '../../admin-panel/tracks/interfaces/i-track';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItems: ITrack[] = [];
  private cartSubject = new BehaviorSubject<ITrack[]>([]);
  
  constructor() {

    this.loadCartFromStorage();
  }

  get cart$() {
    return this.cartSubject.asObservable();
  }

  getCartItems(): ITrack[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  isInCart(trackId: number): boolean {
    return this.cartItems.some(item => item.TrackId === trackId);
  }

  addToCart(track: ITrack): void {
    if (!this.isInCart(track.TrackId)) {
      this.cartItems.push(track);
      this.saveCartToStorage();
      console.log('Cart service: Added track, emitting change. New count:', this.cartItems.length);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  removeFromCart(trackId: number): void {
    const index = this.cartItems.findIndex(item => item.TrackId === trackId);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.saveCartToStorage();
      console.log('Cart service: Removed track, emitting change. New count:', this.cartItems.length);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  toggleInCart(track: ITrack): void {
    if (this.isInCart(track.TrackId)) {
      this.removeFromCart(track.TrackId);
    } else {
      this.addToCart(track);
    }
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    this.saveCartToStorage();
    this.cartSubject.next([]);
  }

  // Get total price of cart items
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const price = Number(item.UnitPrice) || 0;
      return total + price;
    }, 0);
  }

  // Save cart to localStorage
  private saveCartToStorage(): void {
    localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
  }

  // Load cart from localStorage
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next([...this.cartItems]);
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        this.cartItems = [];
      }
    }
  }
}