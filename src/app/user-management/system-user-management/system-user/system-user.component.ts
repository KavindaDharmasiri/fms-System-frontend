import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen' },
  { position: 2, name: 'Helium' },
];

@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrl: './system-user.component.scss'
})
export class SystemUserComponent {

  displayedColumns: string[] = [
    'position',
    'name',
    'action',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
}
