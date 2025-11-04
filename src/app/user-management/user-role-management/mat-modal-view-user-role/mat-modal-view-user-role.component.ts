import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-mat-modal-view-user-role',
  templateUrl: './mat-modal-view-user-role.component.html',
  styleUrl: './mat-modal-view-user-role.component.scss'
})
export class MatModalViewUserRoleComponent {
  userRoleCode: string = '';
  userRoleName: string = '';
  status: boolean = false;
  createdDate: string = '';
  lastModifiedDate: string = '';
  constructor(
    public dialogRef: MatDialogRef<MatModalViewUserRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.userRoleCode = data.element.roleCode;
    this.userRoleName = data.element.roleName;
    this.createdDate = data.element.createdAt;
    this.lastModifiedDate = data.element.updatedAt;
    if(data.element.status == 'ACTIVE'){
      this.status = true
    }
    console.log(this.status,this.userRoleCode,this.userRoleName, data, data.userRoleCode)
  }
}
