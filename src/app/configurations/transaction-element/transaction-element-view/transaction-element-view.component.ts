import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TransactionElementService} from "../../services/transaction-element/transaction-element.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";



export interface PeriodicElement {
  payment_net_id: string;
  payment_net_name: string;
  element_id: string;
  element_name: string;
  status:string;

}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-transaction-element-view',
  templateUrl: './transaction-element-view.component.html',
  styleUrl: './transaction-element-view.component.scss'
})
export class TransactionElementViewComponent implements OnInit{

  reactionTemplateFilter: FormGroup;

  ngOnInit(): void {
    this.loadData();
  }

  constructor( private transactionElementService: TransactionElementService,
               private fb: FormBuilder,
               private router: Router) {
    this.reactionTemplateFilter = this.fb.group({
      templateID: [""],
      templateName: [""],
      subject: [""],
      Status: [""],
    })
  }

  @ViewChild(MatPaginator) paginator ! :MatPaginator;
  isFilterOpen = false;
  displayedColumns: string[] = ['payment_net_id', 'payment_net_name', 'element_id', 'element_name','status','action'];
  selectedStatus: string = '';
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dropdownSingal = 'Active';

  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(): void {

    console.log('Applying filter');

    const inputs = document.querySelectorAll<HTMLInputElement>('.filter-input input');
    const filterValues: { [key: string]: string } = {};

    inputs.forEach((input) => {
      filterValues[input.name] = input.value;
    });

    console.log('Filter Values:', filterValues);

    // Close filter after applying
    this.isFilterOpen = false;
  }





  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } else {
      console.error("Paginator is undefined!");
    }
  }

  loadData() {
    let filterDto ={
      templateId: this.reactionTemplateFilter.value.templateID,
      templateName: this.reactionTemplateFilter.value.templateName,
      subject: this.reactionTemplateFilter.value.subject,
      status: this.reactionTemplateFilter.value.Status,
    }
    this.transactionElementService.getData(this.pageIndex, this.pageSize,filterDto).subscribe(data => {
      this.dataSource = data.data.content;  // Adjust based on your backend response format
      this.totalRecords = data.data.totalElements;  // Adjust based on your backend response
    }, error => {
      if (error.status === 500) {
        this.router.navigate([`/500`]);
      }if (error.status === 502) {
        this.router.navigate([`/502`]);
      }if (error.status === 503) {
        this.router.navigate([`/503`]);
      }if (error.status === 400) {
        this.router.navigate([`/400`]);
      }if (error.status === 401) {
        this.router.navigate([`/401`]);
      }if (error.status === 403) {
        this.router.navigate([`/403`]);
      }if (error.status === 404) {
        this.router.navigate([`/404`]);
      }if (error.status === 408) {
        this.router.navigate([`/408`]);
      }if (error.status === 429) {
        this.router.navigate([`/429`]);
      }
      // Swal.fire({
      //   title: "Error!",
      //   text: "Failed to load data.",
      //   icon: "error"
      // });
    });
  }

  loadDataFilter() {
    this.pageIndex = 0;
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.paginator.pageIndex = 0; // Reset paginator to the first page
    let filterDto ={
      templateId: this.reactionTemplateFilter.value.templateID,
      templateName: this.reactionTemplateFilter.value.templateName,
      subject: this.reactionTemplateFilter.value.subject,
      status: this.reactionTemplateFilter.value.Status,
    }
    this.transactionElementService.getData(this.pageIndex, this.pageSize,filterDto).subscribe(data => {
      this.dataSource = data.data.content;  // Adjust based on your backend response format
      this.totalRecords = data.data.totalElements;  // Adjust based on your backend response
    }, error => {
      if (error.status === 500) {
        this.router.navigate([`/500`]);
      }if (error.status === 502) {
        this.router.navigate([`/502`]);
      }if (error.status === 503) {
        this.router.navigate([`/503`]);
      }if (error.status === 400) {
        this.router.navigate([`/400`]);
      }if (error.status === 401) {
        this.router.navigate([`/401`]);
      }if (error.status === 403) {
        this.router.navigate([`/403`]);
      }if (error.status === 404) {
        this.router.navigate([`/404`]);
      }if (error.status === 408) {
        this.router.navigate([`/408`]);
      }if (error.status === 429) {
        this.router.navigate([`/429`]);
      }
      // Swal.fire({
      //   title: "Error!",
      //   text: "Failed to load data.",
      //   icon: "error"
      // });
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex; // Update current page index
    this.pageSize = event.pageSize; // Update page size
    this.loadData(); // Fetch new data based on updated pagination
  }

  routeToUpdate(elementId: any) {
    // this.router.navigate(['/configurations/transaction-element/add-element']);
    this.router.navigate([`/configurations/transaction-element/add-element`], { queryParams: { id: elementId } });

  }

  routeToView(elementId: any) {
    // this.router.navigate(['/configurations/transaction-element/add-element']);
    this.router.navigate([`/configurations/transaction-element/add-element`], { queryParams: { id: elementId ,mode: 'view' } });

  }

  deleteFieldData(efmsElementId: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.transactionElementService.deleteEfmsElement(efmsElementId).subscribe(() => {
          Swal.fire({
            title: "Deleted!", text: "Your file has been deleted.", icon: "success"
          });
          this.loadData();
        }, error => {
          if (error.status === 500) {
            this.router.navigate([`/500`]);
          }if (error.status === 502) {
            this.router.navigate([`/502`]);
          }if (error.status === 503) {
            this.router.navigate([`/503`]);
          }if (error.status === 400) {
            this.router.navigate([`/400`]);
          }if (error.status === 401) {
            this.router.navigate([`/401`]);
          }if (error.status === 403) {
            this.router.navigate([`/403`]);
          }if (error.status === 404) {
            this.router.navigate([`/404`]);
          }if (error.status === 408) {
            this.router.navigate([`/408`]);
          }if (error.status === 429) {
            this.router.navigate([`/429`]);
          }
          // Swal.fire({
          //   title: "Error!",
          //   text: "Failed to delete the field.",
          //   icon: "error"
          // });
        });


      }
    });
  }

  reset() {
    this.reactionTemplateFilter.reset();
    this.loadData();
  }
}
