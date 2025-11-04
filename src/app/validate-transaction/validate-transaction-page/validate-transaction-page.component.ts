import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {GetAllRolesRequestDTO, RoleDTO} from "../../user-management/user-role-management/dto/Role";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {RoleService} from "../../user-management/user-role-management/service/role.service";
import {ValidateTransactionDTO} from "../DTOs/ValidateTransactionDTO";
import {ValidateTransactionService} from "../service/validate-transaction.service";
import {DateTime} from "luxon";
import {ValidateTransactionViewComponent} from "../validate-transaction-view/validate-transaction-view.component";

@Component({
  selector: 'app-validate-transaction-page',
  templateUrl: './validate-transaction-page.component.html',
  styleUrl: './validate-transaction-page.component.scss'
})
export class ValidateTransactionPageComponent {
  isFilterOpen = false;
  TransactionValidateFilter: FormGroup;
  displayedColumns: string[] = [
    'validate-transaction_id',
    'transaction-time',
    'validation',
    'action',
  ];
  dataSource = new MatTableDataSource<ValidateTransactionDTO>([]);
  totalItems = 0; // Total number of items from the backend
  pageSize = 5; // Default page size
  currentPage = 0; // Start from page 1
  validateTransactionDTO = new ValidateTransactionDTO();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private validationTransactionServise: ValidateTransactionService
  ) {
    this.TransactionValidateFilter = this.fb.group({
      validateTransactionId: [undefined],
      fromTransactionTime: [''],
      toTransactionTime: [''],
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
    this.validateTransactionDTO.page = this.currentPage;
    this.validateTransactionDTO.size = this.pageSize;
    this.validateTransactionDTO.validateTransactionId = undefined;
    this.validateTransactionDTO.isValid = undefined;
    this.validateTransactionDTO.errorMessage = '';
    this.validateTransactionDTO.transactionTime = '';
    this.validateTransactionDTO.fromTransactionTime = '';
    this.validateTransactionDTO.toTransactionTime = '';

    const cleanedDTO = Object.fromEntries(
      Object.entries(this.validateTransactionDTO).filter(
        ([_, v]) => v !== undefined && v !== ''
      )
    );

    this.validationTransactionServise
      .getAllValidateTransactions(cleanedDTO)
      .subscribe((response: any) => {
        this.dataSource.data = response.data;
        this.totalItems = response.metadata?.pagination?.totalElements || 0;
        this.paginator.length = this.totalItems;
      });
  }

  applyFilter(): void {
    const rawId = this.TransactionValidateFilter.get('validateTransactionId')?.value;
    const statusValue = this.TransactionValidateFilter.get('Status')?.value;
    this.validateTransactionDTO.page = this.currentPage;
    this.validateTransactionDTO.size = this.pageSize;
    this.validateTransactionDTO.validateTransactionId = rawId && !isNaN(rawId) ? Number(rawId) : undefined;
    this.validateTransactionDTO.isValid =
      statusValue === 'true' ? true :
        statusValue === 'false' ? false :
          undefined;
    this.validateTransactionDTO.errorMessage = '';
    this.validateTransactionDTO.transactionTime = '';
    this.validateTransactionDTO.isoMessage = '';
    console.log(this.validateTransactionDTO.isValid)
    // Get raw date inputs
    const fromDate = this.TransactionValidateFilter.get('fromTransactionTime')?.value;
    const toDate = this.TransactionValidateFilter.get('toTransactionTime')?.value;

    // Convert only if values exist
    // this.validateTransactionDTO.fromTransactionTime = fromDate ? DateTime.toString() : undefined;
    // this.validateTransactionDTO.toTransactionTime = toDate ? DateTime.toString() : undefined;

    this.validateTransactionDTO.fromTransactionTime = fromDate
      ? DateTime.fromJSDate(fromDate).toFormat("yyyy-MM-dd HH:mm:ss")
      : undefined;

    this.validateTransactionDTO.toTransactionTime = toDate
      ? DateTime.fromJSDate(toDate).toFormat("yyyy-MM-dd HH:mm:ss")
      : undefined;


    const cleanedDTO = Object.fromEntries(
      Object.entries(this.validateTransactionDTO).filter(
        ([_, v]) => v !== undefined && v !== ''
      )
    );

    this.validationTransactionServise
      .getAllValidateTransactions(cleanedDTO)
      .subscribe((response: any) => {
        this.dataSource.data = response.data;
        this.totalItems = response.metadata?.pagination?.totalElements || 0;
        this.paginator.length = this.totalItems;
      });
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  openViewUserRole(element: ValidateTransactionDTO) {
    const dialogRef = this.dialog.open(ValidateTransactionViewComponent,{
      width: '500px',
      data:{
        element
      }
    });
  }

  resetFilter() {
    this.TransactionValidateFilter.reset();
    this.validateTransactionDTO = new ValidateTransactionDTO();
    this.fetchData();
  }
}
