import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatModalComponent } from './mat-modal/mat-modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(MatModalComponent, {
      width: '600px',
    });
  }
}
