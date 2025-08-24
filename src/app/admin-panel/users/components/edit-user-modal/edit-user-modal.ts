import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.html'
})
export class EditUserModal {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<EditUserModal>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public user: IUser
  ) {
    this.editForm = this.fb.group({
      RoleId: [this.user.RoleId || 2, [Validators.required]]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedUser = {
        ...this.user,
        ...this.editForm.value
      };
      this.bottomSheetRef.dismiss(updatedUser);
    }
  }

  onCancel(): void {
    this.bottomSheetRef.dismiss();
  }
}
