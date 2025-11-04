import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description?: string;
  description2?: string;
  isActive?: boolean;
  isActive2?: boolean; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: 'Hydrogen is a chemical element with symbol H and atomic number 1.',
    description2: 'It is the lightest element in the periodic table.',
    isActive: false,
    isActive2: true
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: 'Helium is a chemical element with symbol He and atomic number 2.',
    description2: 'It is a noble gas.',
    isActive: true,
    isActive2: false
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: 'Lithium is a chemical element with symbol Li and atomic number 3.',
    description2: 'It is an alkali metal.',
    isActive: false,
    isActive2: true
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: 'Beryllium is a chemical element with symbol Be and atomic number 4.',
    description2: 'It is an alkaline earth metal.',
    isActive: true,
    isActive2: false
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: 'Boron is a chemical element with symbol B and atomic number 5.',
    description2: 'It is a metalloid.',
    isActive: false,
    isActive2: true
  }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnsToDisplayWithExpand: string[] = ['expand','position', 'name', 'weight', 'symbol'];
  expandedElements: Set<PeriodicElement> = new Set();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleRow(element: PeriodicElement) {
    this.expandedElements.has(element) 
      ? this.expandedElements.delete(element) 
      : this.expandedElements.add(element);
  }

  isExpanded(element: PeriodicElement): boolean {
    return this.expandedElements.has(element);
  }
}