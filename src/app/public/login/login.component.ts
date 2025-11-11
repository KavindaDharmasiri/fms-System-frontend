import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {LoginDTO} from "../dto/Auth";
import {AuthService} from "../service/auth.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Constant} from "../../util/constant";
import {AuditTrackerService} from "../../shared/services/audit-tracker.service";
import {AuditService} from "../../shared/services/audit.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email:string='';
  password:string='';
  constructor(public authService:AuthService,public dialog: MatDialog,private router:Router, private auditTracker: AuditTrackerService, private auditService: AuditService) { }

  openDialog() {
    this.dialog.open(ForgetPasswordComponent);
  }

  login() {
    if(this.password != null && this.email !=  null){
      let loginDTO = new LoginDTO();
      loginDTO.username = this.email;
      loginDTO.password = this.password;
      this.authService.login(loginDTO).pipe(
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
        (response:any)=>{
          console.log(response);
          sessionStorage.setItem(Constant.ACCESS_TOKEN,response.token);
          
          // Set current user for audit tracking
          this.auditTracker.setCurrentUser(this.email);
          
          // Test audit logging
          this.auditService.logUserAction('LOGIN_SUCCESS', 'USER', this.email, {loginTime: new Date()});
          
          setTimeout(() => {
            this.getUserDetails();
          }, 100);
          this.router.navigate(['/dashboard']);

        }
      );
    }
  }
  
  getUserDetails() {
    this.authService.getCurrentUser().subscribe(
      (response: any) => {
        console.log('User details:', response);
        sessionStorage.setItem('user_details', JSON.stringify(response));
      },
      (error) => {
        console.error('Error getting user details:', error);
      }
    );
  }
}
