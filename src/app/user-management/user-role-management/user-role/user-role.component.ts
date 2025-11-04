import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RoleService } from '../service/role.service';
import Swal from "sweetalert2";
import {GetAllRolesRequestDTO, RoleDTO} from "../dto/Role";
import {MatModalAddNewUserRoleComponent} from "../mat-modal-add-new-user-role/mat-modal-add-new-user-role.component";
import {MatModalViewUserRoleComponent} from "../mat-modal-view-user-role/mat-modal-view-user-role.component";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserRoleComponent {
  isFilterOpen = false;
  userRoleFilter: FormGroup;
  displayedColumns: string[] = [
    'code',
    'user-role',
    'created-date',
    'last-modified-date',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<RoleDTO>([]);
  totalItems = 0; // Total number of items from the backend
  pageSize = 5; // Default page size
  currentPage = 0; // Start from page 1

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private roleService: RoleService
  ) {
    this.userRoleFilter = this.fb.group({
      userRoleCode: [''],
      userRoleName: [''],
      Status: [''],
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex ; // MatPaginator uses 0-based index
      this.pageSize = this.paginator.pageSize;
      this.fetchData();
    });
    this.fetchData(); // Initial data fetch
  }

  fetchData() {
    let getAllRolesRequestDTO:GetAllRolesRequestDTO = new GetAllRolesRequestDTO();
    getAllRolesRequestDTO.page = this.currentPage;
    getAllRolesRequestDTO.size = this.pageSize;
    getAllRolesRequestDTO.roleCode ='';
    getAllRolesRequestDTO.roleName = '';
    getAllRolesRequestDTO.status = '';
    this.roleService
      .getAllRoles(getAllRolesRequestDTO)
      .subscribe((response: any) => {
        this.dataSource.data = response.content; // Assuming the API returns data in "items"
        this.totalItems = response.totalElements; // Assuming the API returns total count
        this.paginator.length = this.totalItems; // Update paginator length

      });
  }

  applyFilter(): void {
    const { userRoleCode, userRoleName, Status } = this.userRoleFilter.value;
    let getAllRolesRequestDTO:GetAllRolesRequestDTO = new GetAllRolesRequestDTO();
    getAllRolesRequestDTO.page = this.currentPage;
    getAllRolesRequestDTO.size = this.pageSize;
    getAllRolesRequestDTO.roleCode = userRoleCode;
    getAllRolesRequestDTO.roleName = userRoleName;
    getAllRolesRequestDTO.status = Status;
    this.roleService
      .getAllRoles(getAllRolesRequestDTO)
      .subscribe((response: any) => {
        this.dataSource.data = response.content;
        this.totalItems = response.totalElements;
        this.paginator.length = this.totalItems;
      });
  }

  openAddNewUserRole() {
    const dialogRef = this.dialog.open(MatModalAddNewUserRoleComponent, {
      width: '500px',
      data: { option: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User Material Saved:', result);
        this.fetchData(); // Refresh data after adding a new role
      }
    });
  }


  deleteUserRole(element: RoleDTO) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You wish to delete this User Role - ${element.roleCode} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if(element.roleId){
          this.roleService.deleteRoleByID(element.roleId)
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

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  openEditUserRole(element: RoleDTO) {
    const dialogRef = this.dialog.open(MatModalAddNewUserRoleComponent, {
      width: '500px',
      data: {
        option: 'edit',
        element,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User Material Saved:', result);
        this.fetchData(); // Refresh data after editing a role
      }
    });
  }
  openViewUserRole(element: RoleDTO) {
    const dialogRef = this.dialog.open(MatModalViewUserRoleComponent,{
      width: '500px',
      data:{
        element
      }
    });
  }

  resetFilter() {
    this.fetchData();
    this.userRoleFilter.reset()
  }
}
