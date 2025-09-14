import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITrack } from '../../interfaces/i-track';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-info-track-card',
  standalone: false,
  templateUrl: './info-track-card.html'
})
export class InfoTrackCard {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<InfoTrackCard>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public track: ITrack,
    private snackBar: MatSnackBar,
    private cartService: ShoppingCartService
  ) {}

  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }

  // Shopping cart methods
  isInCart(): boolean {
    return this.cartService.isInCart(this.track.TrackId);
  }

  toggleCart(): void {
    this.cartService.toggleInCart(this.track);
    const action = this.isInCart() ? 'added to' : 'removed from';
    this.snackBar.open(`"${this.track.Name}" ${action} cart!`, 'Close', {
      duration: 2000,
      panelClass: this.isInCart() ? ['success-snackbar'] : ['info-snackbar']
    });
  }

}