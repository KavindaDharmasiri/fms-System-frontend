import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
];

@Component({
  selector: 'app-payment-network',
  templateUrl: './payment-network.component.html',
  styleUrl: './payment-network.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PaymentNetworkComponent {
  isFilterOpen = false;

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
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
