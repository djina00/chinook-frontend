import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ITrack } from '../../../../admin-panel/tracks/interfaces/i-track';
import { InfoTrackCard } from '../../../../admin-panel/tracks/components/info-track-card/info-track-card';

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
    this.bottomSheet.open(InfoTrackCard, {
      data: this.track,
      panelClass: 'track-info-bottom-sheet'
    });
  }
}
