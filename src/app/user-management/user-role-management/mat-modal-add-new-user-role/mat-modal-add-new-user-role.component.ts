import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../service/role.service";
import {RoleDTO} from "../dto/Role";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mat-modal-add-new-user-role',
  templateUrl: './mat-modal-add-new-user-role.component.html',
  styleUrl: './mat-modal-add-new-user-role.component.scss'
})
export class MatModalAddNewUserRoleComponent {
  userRoleCode: string = '';
  userRoleName: string = '';
  roleID:number = 0;
  status: boolean = false;
  title: string = '';
  submitButton: string ='';
  originalUserRoleName: string = '';
  originalStatus: boolean = false;



  constructor(
    public dialogRef: MatDialogRef<MatModalAddNewUserRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roleService:RoleService,
    public router:Router
  ) {
    if(data.option == 'add'){
      this.title = "New User Role";
      this.userRoleCode ='';
      this.submitButton = "+ New User Role";
    }else if(data.option == 'edit'){
      this.title = "Edit User Role"
      this.userRoleCode = data.element.roleCode;
      this.userRoleName = data.element.roleName;
      this.roleID = data.element.roleId;
      this.originalUserRoleName = this.userRoleName;
      if(data.element.status == 'ACTIVE'){
        this.status = true
      }
      this.originalStatus = this.status;
      this.submitButton = "Save"
      console.log(data.element)
    }
    console.log(data)
  }


  saveUserRole() {
    let roleDTO = new RoleDTO();
    if(this.data.option == 'add'){
      roleDTO.roleId = 0;
    }else {
      roleDTO.roleId = this.roleID;
    }
    if(this.userRoleName == null || this.userRoleName ==''){
      Swal.fire(
        'Role name cannot be empty!',
        '' ,
        'warning'
      );
    }else {
      roleDTO.roleCode = this.userRoleCode;
      roleDTO.roleName = this.userRoleName;
      roleDTO.status =this.status ? "ACTIVE" : "INACTIVE" ;

      this.roleService.addRole(roleDTO).pipe(
        catchError(
          (err) =>{
            console.log(err)
            Swal.fire(
              ""+err.error.message,
              '' ,
              'error'
            );
            return throwError(err);
          }
        )
      ).subscribe(
        (response :any)=>{
          if(response.code == 201 || response.code == 200){
            Swal.fire(
              "Success",
              response.message,
              'success'
            );
            this.router.navigate(['/user-management/user-role']);
          }else if (response.code == 0){
            Swal.fire(
              "User Role already exists",
              response.message ,
              'error'
            );
          }
        }
      );


      this.dialogRef.close({ code: this.userRoleCode, name: this.userRoleName, status: this.status });
    }
  }

  isEdited(): boolean {
    return this.userRoleName !== this.originalUserRoleName ||
      this.status !== this.originalStatus;
  }

  resetUserRole() {
    this.userRoleName = this.originalUserRoleName;
    this.status = this.originalStatus;
  }
}
