import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ITrack } from '../../interfaces/i-track';

@Component({
  selector: 'app-info-track-card',
  standalone: false,
  templateUrl: './info-track-card.html'
})
export class InfoTrackCard {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<InfoTrackCard>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public track: ITrack
  ) {}

  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }

}