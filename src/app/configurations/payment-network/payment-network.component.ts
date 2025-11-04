import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import {PaymentNetworkService} from "./service/payment-network.service";
import {ListPaymentNetworkRequestDTO} from "./dto/PaymentNetworkDTO";

@Component({
  selector: 'app-payment-network',
  templateUrl: './payment-network.component.html',
  styleUrls: ['./payment-network.component.scss']
})
export class PaymentNetworkComponent implements OnInit {
  isFilterOpen = false;
  payment_network_filter: FormGroup;
  displayedColumns: string[] = [
    'network_id',
    'network_name',
    'BIN',
    'BIN_length',
    'status',
    'action'
  ];
  filterState: ListPaymentNetworkRequestDTO | null = null;
  dataSource = new MatTableDataSource<any>();
  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private paymentNetworkService: PaymentNetworkService
  ) {
    this.payment_network_filter = this.fb.group({
      networkID: [null],
      networkName: [null],
      BIN: [null],
      BINLength: [null],
      Status: [null]
    });
  }

  ngOnInit(): void {
    const initialParams: ListPaymentNetworkRequestDTO = {
      paymentNetworkID: null,
      paymentNetworkName: null,
      bin: null,
      binLength: null,
      status: null,
      pageNo: this.pageIndex,
      pageSize: this.pageSize
    };

    this.filterState = initialParams;
    this.loadPaymentNetworks(initialParams);
  }

  // ngAfterViewInit() {
  //   if (this.paginator) {
  //     this.dataSource.paginator = this.paginator;
  //   } else {
  //     console.error("Paginator is undefined!");
  //   }
  // }

  loadPaymentNetworks(params: ListPaymentNetworkRequestDTO): void {
    this.paymentNetworkService.listPaymentNetwork(params).subscribe((response: any) => {
      if (response && response.content) {
        this.dataSource.data = response.content.map((item: any) => ({
          Network_ID: item.paymentNetworkId,
          Network_Name: item.networkName,
          BIN: item.bin,
          BIN_Length: String(item.binLength).padStart(2, '0'),
          Rule_Group: '-',
          Status: item.status === 'ACTIVE' ? 'Active' : 'Inactive',
        }));
        this.totalRecords = response.totalElements;
      }
    });
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter(): void {
    const filterValues = this.payment_network_filter.value;
    console.log(filterValues)
    const params: ListPaymentNetworkRequestDTO = {
      paymentNetworkID: filterValues.networkID || null,
      paymentNetworkName: filterValues.networkName || null,
      bin: filterValues.BIN || null,
      binLength: filterValues.BINLength || null,
      status: filterValues.Status || null,
      pageNo: 0,
      pageSize:this.pageSize || 5
    };
    this.filterState = params; // Save filter state
    this.loadPaymentNetworks(params);

    this.isFilterOpen = false;
  }

  onPageChange($event: PageEvent): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize =  $event.pageSize;
    this.filterState = {
      ...this.filterState!,
      pageNo: this.pageIndex,
      pageSize: this.pageSize
    };
    this.loadPaymentNetworks(this.filterState);

  }

  resetFilter() {
    this.payment_network_filter.reset();
    this.applyFilter();
    this.isFilterOpen = true;
  }
}
