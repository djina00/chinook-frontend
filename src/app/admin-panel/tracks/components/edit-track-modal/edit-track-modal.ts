import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ITrack } from '../../interfaces/i-track';

@Component({
  selector: 'app-edit-track-modal',
  standalone: false,
  templateUrl: './edit-track-modal.html'
})
export class EditTrackModal {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<EditTrackModal>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public track: ITrack
  ) {
    this.editForm = this.fb.group({
      Name: [this.track.Name, [Validators.required, Validators.minLength(1)]],
      UnitPrice: [this.track.UnitPrice, [Validators.required, Validators.min(0)]]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedTrack = {
        ...this.track,
        ...this.editForm.value
      };
      this.bottomSheetRef.dismiss(updatedTrack);
    }
  }

  onCancel(): void {
    this.bottomSheetRef.dismiss();
  }
}