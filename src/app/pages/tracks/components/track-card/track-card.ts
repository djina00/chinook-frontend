import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITrack } from '../../../../admin-panel/tracks/interfaces/i-track';
import { InfoTrackCard } from '../../../../admin-panel/tracks/components/info-track-card/info-track-card';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-track-card',
  standalone: false,
  templateUrl: './track-card.html',
  styleUrl: './track-card.css'
})
export class TrackCard {
  @Input() track!: ITrack;

  constructor(
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private cartService: ShoppingCartService
  ) {}

  openTrackInfo(): void {
    this.bottomSheet.open(InfoTrackCard, {
      data: this.track,
      panelClass: 'track-info-bottom-sheet'
    });
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
