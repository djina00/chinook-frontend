import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ITrack } from '../../interfaces/i-track';

@Component({
  selector: 'app-track-edit-card',
  standalone: false,
  templateUrl: './track-edit-card.html'
})
export class TrackEditCard {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<TrackEditCard>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public track: ITrack
  ) {}

  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }

}