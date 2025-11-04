import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SystemUserDto} from "../dto/SystemUser";
import {SystemUserService} from "../service/system-user.service";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {throwError} from "rxjs";
import {response} from "express";
import {
    AppUserPrivilegesServiceService
} from "../../privilege-management/services/user-privileges-service/app-user-privileges-service.service";

@Component({
  selector: 'app-add-system-users',
  templateUrl: './add-system-users.component.html',
  styleUrl: './add-system-users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddSystemUsersComponent {
  actionType: string = "";
  id: number =0;
  user:SystemUserDto={};
  title: string = '';
  page_title: string = '';
  systemUserForm: FormGroup;
  roles: any[] = [];
  selectedUserRole: number | null = null;
  isView: boolean=false;
  constructor(
    private router:Router,
    private user_privileges_service : AppUserPrivilegesServiceService,
    private userService:SystemUserService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.systemUserForm = this.fb.group({
      userId: [0],
      userCategory: [""],
      username: [""],
      password: [""],
      nic: [""],
      userRole: this.fb.control<number[]>([], Validators.required),
      contact: [""],
      email: [""],
      empId: [""],
      fullName: [""],
      city: [""],
      address: [""],
      status: [""]
    })
  }
  ngOnInit(): void {
    this.actionType = this.route.snapshot.paramMap.get("action") || "";
    // this.id=this.route.snapshot.paramMap.get("id") || "";
    this.id=parseInt(this.route.snapshot.paramMap.get("id") || "",10)
    this.lodeRoleName();

    if(this.actionType == 'add'){
      this.title = "New System User";
      this.page_title = "Create New System User"
    }else if(this.actionType == 'view'){
      console.log(this.id)
      this.isView=true;
      this.title = this.id.toString();
      this.setUserDtoValue(this.id);
      this.systemUserForm.disable();

      this.page_title = "View System User"
    }else if(this.actionType == 'edit'){
      this.page_title = "Edit System User"
      this.title = "Edit User ";
      this.setUserDtoValue(this.id);
    }
  }

  lodeRoleName(){
      this.user_privileges_service.getAllRoleNames().subscribe({
          next: (roles) => {
              console.log('Roles received from backend:', roles);
              this.roles = roles;
          },
          error: (err) => {
              console.error('Error fetching roles:', err);
          }
      });
  }

  setUserDtoValue(userId:number){
    if(userId){
      this.userService.getSystemUserByID(userId).pipe(
        catchError(
          (err)=>{
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
        (res:any)=>{
          console.log(res.data[0])
          this.systemUserForm.patchValue(res.data[0]);
          this.systemUserForm.patchValue({
            userRole:Array.from(new Set(res.data[0].userRole))
          })
          console.log(this.systemUserForm.value)
          if(res.data[0].status=="INACTIVE"){
            this.systemUserForm.patchValue({
              status:false
            })
          }
        }
      )
    }

  }

  reset(){
    this.systemUserForm.reset();
    this.setUserDtoValue(this.id);

  }



  addSystemUser() {
    let  systemUser=new SystemUserDto();
    systemUser=this.systemUserForm.value;
    this.userService.addSystemUser(systemUser).pipe(
      catchError(
        (err)=>{
          console.log(err)
          Swal.fire(
            "User Save Unsuccessful..",
            '' ,
            'error'
          );
          return throwError(err);
        }
      )
    ).subscribe(
      (res:any)=>{
        if(res.code == 201){
          Swal.fire(
            "User Add Success..",
            '',
            'success'
          )
          this.router.navigate(['/user-management/system-users'])
        }else {
          Swal.fire(
            res.message,
            '' ,
            'error'
          );
        }
      }
    );

  }
}
