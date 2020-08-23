import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmData } from '../models/confirmData';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmdialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ConfirmdialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ConfirmData
              ) {}

  ngOnInit() {

  }

  onConfirm(): void {
      // Close the dialog, return true
      this.dialogRef.close(true);
  }

  onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(false);
  }
}
