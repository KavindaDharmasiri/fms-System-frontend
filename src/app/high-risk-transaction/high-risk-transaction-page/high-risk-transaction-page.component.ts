import {ChangeDetectorRef, Component, input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {HighRiskService} from "../../configurations/services/high-risk/high-risk.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export interface PeriodicElement {
  time_stamp: string;
  tran_id: string;
  card_num: number;
  status:string;
  acquirer_bin:number;
  tran_amount:number;
  currency:string;
  merchant_name:string;


}

const ELEMENT_DATA: PeriodicElement[] = [
  { time_stamp: '1', tran_id: 'Hydrogen', card_num: 1.0079, acquirer_bin:13451,status:'active',tran_amount:3435456546 ,currency:"LKS",merchant_name:"EPIC"},
  { time_stamp: '2', tran_id: 'Helium', card_num: 4.0026, acquirer_bin: 13451 ,status:'active',tran_amount:5446456,currency:"LKS" ,merchant_name:"EPIC"},
  { time_stamp: '3', tran_id: 'Lithium', card_num: 6.941, acquirer_bin: 13451 ,status:'active',tran_amount:46546546,currency:"LKS",merchant_name:"EPIC" },
  { time_stamp: '4', tran_id: 'Beryllium', card_num: 9.0122, acquirer_bin: 13451 ,status:'active', tran_amount:4646546,currency:"LKS",merchant_name:"EPIC" },
  { time_stamp: '5', tran_id: 'Boron', card_num: 10.811, acquirer_bin: 13451 ,status:'active' ,tran_amount:4646546,currency:"LKS" ,merchant_name:"EPIC" },
];


@Component({
  selector: 'app-high-risk-transaction-page',
  templateUrl: './high-risk-transaction-page.component.html',
  styleUrl: './high-risk-transaction-page.component.scss'
})
export class HighRiskTransactionPageComponent implements OnInit{

  @ViewChild(MatPaginator) paginator ! :MatPaginator;
  isFilterOpen = false;
  displayedColumns: string[] = ['time_stamp', 'tran_id', 'card_num', 'acquirer_bin','status','tran_amount','currency','merchant_name','manual_review','action'];
  selectedStatus: string = '';
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dropdownSingal = 'Active';
  filterForm: FormGroup;
  originalData: any[] = []; // All transactions
  filteredData: any[] = []; // Filtered results
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

  constructor(
    private highRiskService: HighRiskService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      tranId: [''],
      cardNumber: [''],
      acquirerBin: [''],
      transactionAmount: [''],
      currencyCode: [''],
      merchantName: [''],
      fromRiskScore: [''],
      toRiskScore: [''],
      paymentNet: [''],
      ruleGroup: [''],
      rule: [''],
      status: ['']
    });

    // this.highRiskService.loadRules().subscribe({
    //   next: (data) => {
    //   },
    //   error: (err) => console.error('SSE Error:', err)
    // });
  }
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.highRiskService.getTblData().subscribe(data => {
      this.originalData = data.data;
      this.filteredData = [...this.originalData];
      this.dataSource = new MatTableDataSource(this.filteredData);
      this.dataSource.paginator = this.paginator;
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

    this.getStreamData();
  }

    getStreamData() {
      this.highRiskService.getTransactionStream().subscribe({
        next: (data) => {
          const updatedElements = [...this.dataSource.data];

          // Append the new data to the beginning (or end as needed)
          updatedElements.unshift(data); // or .push(data) for appending at the end

          // Update the data source
          this.dataSource.data = updatedElements;
        },
        error: (err) => console.error('SSE Error:', err)
      });
      }

  NavigateToView(element: any) {
    this.highRiskService.setElement(element); // persist data
    this.router.navigate(['/high-risk-transaction/view']).then(() => {
      console.log("navigated to view");
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.filteredData = [...this.originalData];
    this.dataSource.data = this.filteredData;
  }

  exportPdf() {
    const doc = new jsPDF();

    const headers = [['Tran ID', 'Amount', 'Card Number', 'Acquirer BIN', 'Date']];

    const rows = this.filteredData.map(item => {
      const p = item.tranPacket;
      return [
        p.tranId,
        p.amount,
        p.cardSequenceNumber || 'N/A',
        p.acquirerInstitutionId || 'N/A',
        new Date(item.createdAt).toLocaleDateString(),
      ];
    });

    autoTable(doc, {
      head: headers,
      body: rows,
    });

    doc.save('filtered-transactions.pdf');
  }

  applyFilters() {
    const filters = this.filterForm.value;
      console.log(this.originalData[0])
    this.filteredData = this.originalData.filter(item => {
      const createdDate = new Date(item.createdAt);
      const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
      const toDate = filters.toDate ? new Date(filters.toDate) : null;
      return (
        !fromDate || createdDate >= fromDate) &&
        (!toDate || createdDate <= toDate) &&
        (!filters.tranId || item.tranUuid?.toString().includes(filters.tranId)) &&
        (!filters.cardNumber || item.tranPacket.cardSequenceNumber?.toString().includes(filters.cardNumber)) &&
        (!filters.acquirerBin || item.tranPacket.cardSequenceNumber.slice(0, 4)?.toString().includes(filters.acquirerBin)) &&
        (!filters.transactionAmount || item.tranPacket.amount?.toString().includes(filters.transactionAmount)) &&
        (!filters.currencyCode || item.tranPacket.transactionCurrencyCode?.includes(filters.currencyCode)) &&
        (!filters.merchantName || item.tranPacket.merchant_name?.toLowerCase().includes(filters.merchantName.toLowerCase())) &&
        (!filters.status || item.status?.toLowerCase() === filters.status.toLowerCase());
    });
    this.dataSource = new MatTableDataSource(this.filteredData);
    this.dataSource.paginator = this.paginator;
    this.isFilterOpen = false;
  }
}
