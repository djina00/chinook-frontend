import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { AuthService, Customer } from '../../shared/services/auth';
import { ITrack } from '../../admin-panel/tracks/interfaces/i-track';
import { CheckoutRequest, CheckoutTrack } from '../../shared/interfaces/i-invoice';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: ITrack[] = [];
  totalPrice: number = 0;
  isProcessingCheckout: boolean = false;

  constructor(
    private cartService: ShoppingCartService,
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

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
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      console.error('User not logged in');
      this.snackBar.open('Please log in to proceed with checkout', 'Close', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (this.cartItems.length === 0) {
      console.error('Cart is empty');
      this.snackBar.open('Your cart is empty', 'Close', {
        duration: 3000,
        panelClass: ['info-snackbar']
      });
      return;
    }

    this.isProcessingCheckout = true;

    const tracks: CheckoutTrack[] = this.cartItems.map(track => ({
      track_id: track.TrackId,
      quantity: 1
    }));

    const checkoutRequest: CheckoutRequest = {
      customer_id: currentUser.CustomerId,
      tracks: tracks,
      billing_address: currentUser.Address,
      billing_city: currentUser.City,
      billing_state: currentUser.State,
      billing_country: currentUser.Country,
      billing_postal_code: currentUser.PostalCode
    };

    this.invoiceService.processCheckout(checkoutRequest).subscribe({
      next: (response) => {
        console.log('Checkout completed successfully:', response);
        this.snackBar.open(`Checkout successful!`, 'Close', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        this.cartService.clearCart();
        this.isProcessingCheckout = false;
      },
      error: (error) => {
        console.error('Error during checkout:', error);
        this.snackBar.open(`Checkout failed: ${error.error?.message || 'Unknown error occurred'}`, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isProcessingCheckout = false;
      }
    });
  }

  get safeTotal(): number {
    return Number(this.totalPrice) || 0;
  }
}