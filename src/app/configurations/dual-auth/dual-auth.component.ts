import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DualAuthDTO, FilterDualAuthentication, RejectDualAuthDTO, UsernameForSelectorDTO} from "./dto/DualAuthDTO";
import {DualAuthService} from "./service/dual-auth.service";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {throwError} from "rxjs";
import {MatModalViewDualAuthComponent} from "./mat-modal-view-dual-auth/mat-modal-view-dual-auth.component";


@Component({
  selector: 'app-dual-auth',
  templateUrl: './dual-auth.component.html',
  styleUrl: './dual-auth.component.scss'
})
export class DualAuthComponent implements OnInit{
  isFilterOpen = false;
  dualAuthFilter: FormGroup;
  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  users:UsernameForSelectorDTO[] = [];
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dualAuthService:DualAuthService
  ) {
    this.dualAuthFilter = this.fb.group({
      fromDate: [null],
      toDate: [null],
      configuration: [null],
      task: [null],
      modifiedUser: [null],
    })
  }
  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(): void {

    console.log('Applying filter');

    const filter = new FilterDualAuthentication();
    filter.from = this.dualAuthFilter.get('fromDate')?.value;
    filter.to = this.dualAuthFilter.get('toDate')?.value;
    filter.configuration = this.dualAuthFilter.get('configuration')?.value;
    filter.task = this.dualAuthFilter.get('task')?.value;
    filter.modifiedUser = this.dualAuthFilter.get('modifiedUser')?.value;
    filter.pageNo = this.pageIndex;
    filter.pageSize = this.pageSize;
    this.loadDataToTable(filter);
    console.log('Filter Values:', this.dualAuthFilter.value);

    // Close filter after applying
    this.isFilterOpen = false;
  }

  displayedColumns: string[] = [
    'identifier',
    'task',
    'modified-user',
    'modified-date-time',
    'created-date-time',
    'action',
  ];
  dataSource = new MatTableDataSource<DualAuthDTO>();

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  openViewDualAuth(element: any) {
    const dialogRef = this.dialog.open(MatModalViewDualAuthComponent,{
      width: '600px',
      data:{
        element
      }
    });
  }

  ngOnInit(): void {
    const filter = new FilterDualAuthentication();
    filter.from = null;
    filter.to = null;
    filter.configuration = null;
    filter.task = null;
    filter.modifiedUser = null;
    filter.pageNo = 0;
    filter.pageSize = 10;
    this.loadUsers();
    this.loadDataToTable(filter);
  }
  loadUsers(){
    this.dualAuthService.getAllUsersWithUsername().pipe(
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
      (response:any) =>{
        this.users = response;
      }
    )
  }
  onPageChange(event: any): void {
    const filter = new FilterDualAuthentication();
    filter.from = this.dualAuthFilter.get('fromDate')?.value;
    filter.to = this.dualAuthFilter.get('toDate')?.value;
    filter.configuration = this.dualAuthFilter.get('configuration')?.value;
    filter.task = this.dualAuthFilter.get('task')?.value;
    filter.modifiedUser = this.dualAuthFilter.get('modifiedUser')?.value;
    filter.pageNo = event.pageIndex;
    filter.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex; // Update current page index
    this.pageSize = event.pageSize; // Update page size
    this.loadDataToTable(filter); // Fetch new data based on updated pagination
  }
  loadDataToTable(filter:FilterDualAuthentication){
    this.dualAuthService.getAllPendingApproveRequests(filter).pipe(
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
        if(response && response.content){
          this.dataSource = response.content;
          this.totalRecords = response.totalElements
        }
      }
    );
  }

  approveRequest(identifier: string) {
    this.dualAuthService.approveRequest(identifier).pipe(
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
      (response:any) =>{
        if(response.success){
          Swal.fire({
            title: 'Approved!',
            text: response.data.data,
            icon: 'success',
          });
        }
        this.applyFilter();
      }
    );

  }
    rejectRequest(identifier: string) {
      Swal.fire({
        title: 'Reject reason',
        input: 'text',
        inputPlaceholder: 'Type here...',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('You entered:', result.value);
          let rejectDualAuthDTO = new RejectDualAuthDTO(
            identifier,result.value
          );
          this.dualAuthService.rejectRequest(rejectDualAuthDTO).pipe(
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
            (response:any) =>{
              console.log(response)
              if(response.success){
                Swal.fire({
                  title: 'Requets Rejected Successful!',
                  text: response.data.data,
                  icon: 'success',
                });
              }
              this.applyFilter();
            }
          );
        }
      });

    }

  resetFilter() {
    this.dualAuthFilter.reset();
    this.applyFilter();
    this.isFilterOpen = true;
  }
}
