import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatModalViewDualAuthComponent} from "../dual-auth/mat-modal-view-dual-auth/mat-modal-view-dual-auth.component";
import {ReactionTemplateService} from "../services/reactionTemplate/reaction-template.service";
import {ReactionTemplateDTO} from "../../shared/dto/ReactionTemplateDTO";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

export interface reactionTemplateElement {
  Template_ID: string;
  Template_Name: string;
  Subject: string;
  Email_Alerts: string;
  FRM_Notifications: string;
  Status: string
}

const ELEMENT_DATA: ReactionTemplateDTO[] = [];

@Component({
  selector: 'app-reaction-templates',
  templateUrl: './reaction-templates.component.html',
  styleUrl: './reaction-templates.component.scss'
})
export class ReactionTemplatesComponent implements OnInit{
  isFilterOpen = false;
  reactionTemplateFilter: FormGroup;

  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private reactionTemplateService: ReactionTemplateService,
    private router: Router
  ) {
    this.reactionTemplateFilter = this.fb.group({
      templateID: [""],
      templateName: [""],
      subject: [""],
      Status: [""],
    })
  }
  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(): void {
    this.getData();
    console.log('Applying filter');

    // const inputs = document.querySelectorAll<HTMLInputElement>('.filter-input input');
    // const filterValues: { [key: string]: string } = {};
    //
    // inputs.forEach((input) => {
    //   filterValues[input.name] = input.value;
    // });

    console.log('Filter Values:', this.reactionTemplateFilter.value);

    // Close filter after applying
    this.isFilterOpen = false;
  }

  displayedColumns: string[] = [
    'template-id',
    'template-name',
    'subject',
    'email-alerts',
    'frm-notifications',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<ReactionTemplateDTO>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openViewDualAuth(element: reactionTemplateElement) {
    const dialogRef = this.dialog.open(MatModalViewDualAuthComponent,{
      width: '600px',
      data:{
        element
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    let filterDto ={
      templateId: this.reactionTemplateFilter.value.templateID,
      templateName: this.reactionTemplateFilter.value.templateName,
      subject: this.reactionTemplateFilter.value.subject,
      status: this.reactionTemplateFilter.value.Status,
    }
    this.reactionTemplateService.getData(this.pageIndex, this.pageSize,filterDto).subscribe(data => {
      this.dataSource = data.data.content;  // Adjust based on your backend response format
      this.totalRecords = data.data.totalElements;  // Adjust based on your backend response
    },error => {
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
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex; // Update current page index
    this.pageSize = event.pageSize; // Update page size
    this.getData(); // Fetch new data based on updated pagination
  }

  deleteTemplate(reactionTemplateId: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you wish to delete this alerting template?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.reactionTemplateService.deleteSingleTemplate(reactionTemplateId).subscribe(() => {
          Swal.fire({
            title: "Deleted!", text: "Alerting Template Successfully Deleted.", icon: "success"
          });
          this.getData();
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

  resetFilter() {
    this.reactionTemplateFilter.reset();
    this.applyFilter();
    this.isFilterOpen = true;
  }
}
