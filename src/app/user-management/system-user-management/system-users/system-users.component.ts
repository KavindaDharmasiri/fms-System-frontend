import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SystemUserService} from "../service/system-user.service";
import {GetAllRolesRequestDTO} from "../../user-role-management/dto/Role";
import {GetAllSystemUsers, SystemUserDto} from "../dto/SystemUser";
import Swal from "sweetalert2";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {
  AppUserPrivilegesServiceService
} from "../../privilege-management/services/user-privileges-service/app-user-privileges-service.service";

export interface SystemUserElement {
  Code: number;
  Employee_ID: number;
  Full_Name: string;
  User_Role: string;
  User_Category: string;
  Contact_No: number;
  Email: string;
  Status: string;
}

const ELEMENT_DATA: SystemUserElement[] = [
  { Code: 79193719, Employee_ID: 1, Full_Name: 'Name 01', User_Role: 'Role 01', User_Category: 'Category 01', Contact_No: 774563745, Email: 'Role 01', Status:'Active'},
  { Code: 79193719, Employee_ID: 2, Full_Name: 'Name 02', User_Role: 'Role 02', User_Category: 'Category 02', Contact_No: 774563745, Email: 'Role 02', Status:'Inactive'},
  { Code: 79193719, Employee_ID: 3, Full_Name: 'Name 03', User_Role: 'Role 03', User_Category: 'Category 03', Contact_No: 774563745, Email: 'Role 03', Status:'Active'},
  { Code: 79193719, Employee_ID: 4, Full_Name: 'Name 04', User_Role: 'Role 04', User_Category: 'Category 04', Contact_No: 774563745, Email: 'Role 04', Status:'Active'},
  { Code: 79193719, Employee_ID: 5, Full_Name: 'Name 05', User_Role: 'Role 05', User_Category: 'Category 05', Contact_No: 774563745, Email: 'Role 05', Status:'Active'},
];

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrl: './system-users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SystemUsersComponent{
  isFilterOpen = false;
  userRoleCode: string = this.generateRandomCode();
  userRoleName: string = '';
  roles: any[] = [];

  status: boolean = false;
  systemUserFiler: FormGroup;
  totalItems = 0; // Total number of items from the backend
  pageSize = 5; // Default page size
  currentPage = 0; // Start from page 1
  dataSource = new MatTableDataSource<SystemUserDto>([]);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;


  constructor(
    private router:Router,
    private userService:SystemUserService,
    public dialog: MatDialog,
    private user_privileges_service : AppUserPrivilegesServiceService,
    private fb: FormBuilder)
  {
    this.lodeRoleName()
    this.fetchData(); // Initial data fetch
    this.systemUserFiler = this.fb.group({
      userId: [""],
      username: [null],
      fullName: [null],
      nic: [null],
      userRole: [null],
      empId: [null],
      email: [null],
      contact: [null],
      status: [null]
    })
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex ; // MatPaginator uses 0-based index
      this.pageSize = this.paginator.pageSize;
      this.fetchData();
    });

  }



  fetchData() {
    console.log(this.pageSize)
    const getAllRolesRequestDTO:GetAllSystemUsers = {
      userId: null,
      username: null,
      fullName: null,
      nic: null,
      userRole: null,
      empId: null,
      email: null,
      contact: null,
      status: null
    };
    this.userService
      .getAllSystemUser(getAllRolesRequestDTO,this.currentPage, this.pageSize)
      .subscribe((response: any) => {
        console.log(response.content)
        this.dataSource.data = response.content; // Assuming the API returns data in "items"
        this.totalItems = response.totalElements; // Assuming the API returns total count
        this.paginator.length = this.totalItems; // Update paginator length
      });
  }

  getAllRoles(){

  }


  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }


  displayedColumns: string[] = [
    'code',
    'employee-id',
    'full-name',
    'user-category',
    'contact-num',
    'email',
    'status',
    'action'
  ];


  applyFilter(): void {

    const getAllRolesRequestDTO:GetAllSystemUsers = {
      userId:this.systemUserFiler.get("userId")?.value,
      username: this.systemUserFiler.get("username")?.value,
      fullName: this.systemUserFiler.get("fullName")?.value,
      nic: this.systemUserFiler.get("nic")?.value,
      userRole: this.systemUserFiler.get("userRole")?.value,
      empId: this.systemUserFiler.get("empId")?.value,
      email: this.systemUserFiler.get("email")?.value,
      contact: this.systemUserFiler.get("contact")?.value,
      status: this.systemUserFiler.get("status")?.value
    };
    //
    // const getAllRolesRequestDTO:GetAllSystemUsers = {
    //   userId: null,
    //   username: null,
    //   fullName: null,
    //   nic: null,
    //   userRole: null,
    //   empId: this.systemUserFiler.get("empId")?.value,
    //   email: null,
    //   contact: null,
    //   status: "ACTIVE"
    // };

    console.log(this.systemUserFiler.get("status")?.value)
    console.log(getAllRolesRequestDTO.status)

    this.userService
      .getAllSystemUser(getAllRolesRequestDTO,this.currentPage, this.pageSize)
      .subscribe((response: any) => {
        console.log(response.content)
        this.dataSource.data = response.content; // Assuming the API returns data in "items"
        this.totalItems = response.totalElements; // Assuming the API returns total count
        this.paginator.length = this.totalItems; // Update paginator length
      });

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


  reset(){
    this.systemUserFiler.reset();
    this.fetchData();

  }


  // Generate a random user role code
  generateRandomCode(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
  }


  deleteSystemUser(element:SystemUserDto) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if(element.userId){
          this.userService.deleteSystemUserByID(element.userId)
            .pipe(
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
            )
            .subscribe(
              (response:any)=>{
                if(response.code == 200){
                  Swal.fire(
                    response.message,
                    '' ,
                    'success'
                  );
                  this.fetchData();
                }
              }
            );
        }

        // Call your delete API here
        console.log('Deleted:', element);
        this.fetchData(); // Refresh data after deletion
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
