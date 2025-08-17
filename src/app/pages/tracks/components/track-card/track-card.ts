import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ITrack } from '../../interfaces/i-track';
import { TrackInfoBottomSheet } from '../../../../shared/components/track-info-bottom-sheet/track-info-bottom-sheet';

@Component({
  selector: 'app-track-card',
  standalone: false,
  templateUrl: './track-card.html',
  styleUrl: './track-card.css'
})
export class TrackCard {
  @Input() track!: ITrack;

  constructor(private bottomSheet: MatBottomSheet) {}

  openTrackInfo(): void {
    this.bottomSheet.open(TrackInfoBottomSheet, {
      data: this.track,
      panelClass: 'track-info-bottom-sheet'
    });
  }
}
