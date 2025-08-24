import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ITrack } from '../../admin-panel/tracks/interfaces/i-track';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: ITrack[] = [];
  totalPrice: number = 0;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.loadCart();
    // Subscribe to cart changes
    this.cartService.cart$.subscribe(() => {
      this.loadCart();
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = Number(this.cartService.getTotalPrice()) || 0;
  }

  removeFromCart(track: ITrack): void {
    this.cartService.removeFromCart(track.TrackId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToCheckout(): void {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout with items:', this.cartItems);
  }

  get safeTotal(): number {
    return Number(this.totalPrice) || 0;
  }
}