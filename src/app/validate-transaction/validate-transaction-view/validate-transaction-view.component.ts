import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {
  MatModalViewUserRoleComponent
} from "../../user-management/user-role-management/mat-modal-view-user-role/mat-modal-view-user-role.component";
import {DateTime} from "luxon";

@Component({
  selector: 'app-validate-transaction-view',
  templateUrl: './validate-transaction-view.component.html',
  styleUrl: './validate-transaction-view.component.scss'
})
export class ValidateTransactionViewComponent {
  validateTransactionID: string = '';
  isValid: boolean = false;
  TransactionDateTime: string = '';
  errorMessageList: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<ValidateTransactionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.validateTransactionID = data.element.validateTransactionId;
    this.TransactionDateTime = this.datePipe.transform(data.element.transactionTime, 'yyyy-MM-dd HH:mm:ss') ?? '';

    try {
      this.errorMessageList = JSON.parse(data.element.errorMessage);
    } catch (e) {
      this.errorMessageList = [data.element.errorMessage]; // fallback to single string
    }

    this.isValid = data.element.isValid
    console.log(this.isValid,this.validateTransactionID,this.isValid, data, data.userRoleCode)
  }
}
