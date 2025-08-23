import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ITrack } from '../../../admin-panel/tracks/interfaces/i-track';

@Component({
  selector: 'app-track-info-bottom-sheet',
  standalone: false,
  templateUrl: './track-info-bottom-sheet.html',
  styleUrl: './track-info-bottom-sheet.css'
})
export class TrackInfoBottomSheet {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<TrackInfoBottomSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public track: ITrack
  ) {}

  closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }

}
