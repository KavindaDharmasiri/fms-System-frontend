import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


export interface PeriodicElement {
  last_simu_date: string;
  flagged: string;
  status:string;

}

export interface PeriodicElement2 {
  simu_id: number;
  rule_group: string;
  start_date:string;
  end_date:string;
  creat_user:string;
  creat_date:string;

}
export interface PeriodicElement3 {
  simu_id: number;
  time_stamp: string;
  card_num:string;
  acquire_bin:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { last_simu_date: '10/7/2054-13/8/2054', flagged: '16',status:'active' },
  { last_simu_date: '10/7/2054-13/8/2054', flagged: '7' ,status:'active' },
  { last_simu_date: '10/7/2054-13/8/2054', flagged: 'None',status:'active' },
  { last_simu_date: '10/7/2054-13/8/2054', flagged: '3' ,status:'active' },
  { last_simu_date: '10/7/2054-13/8/2054', flagged: '12',status:'active' },
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  { simu_id:1234, rule_group:"Group 1", start_date: '10/7/2054-13/8/2054', end_date: '10/7/2054-13/8/2054', creat_user: 'user',creat_date:'10/7/2054-13/8/2054' },
  { simu_id:1234, rule_group:"Group 1", start_date: '10/7/2054-13/8/2054', end_date: '10/7/2054-13/8/2054', creat_user: 'user',creat_date:'10/7/2054-13/8/2054' },
  { simu_id:1234, rule_group:"Group 1", start_date: '10/7/2054-13/8/2054', end_date: '10/7/2054-13/8/2054', creat_user: 'user',creat_date:'10/7/2054-13/8/2054' },
  { simu_id:1234, rule_group:"Group 1", start_date: '10/7/2054-13/8/2054', end_date: '10/7/2054-13/8/2054', creat_user: 'user',creat_date:'10/7/2054-13/8/2054' },
  { simu_id:1234, rule_group:"Group 1", start_date: '10/7/2054-13/8/2054', end_date: '10/7/2054-13/8/2054', creat_user: 'user',creat_date:'10/7/2054-13/8/2054' },

];

const ELEMENT_DATA3: PeriodicElement3[] = [
  {simu_id:13244, time_stamp: '10/7/2054-13/8/2054', card_num: '***********344',acquire_bin:'22343' },
  {simu_id:13244, time_stamp: '10/7/2054-13/8/2054', card_num: '***********344',acquire_bin:'22343' },
  {simu_id:13244, time_stamp: '10/7/2054-13/8/2054', card_num: '***********344',acquire_bin:'22343' },
  {simu_id:13244, time_stamp: '10/7/2054-13/8/2054', card_num: '***********344',acquire_bin:'22343' },
  {simu_id:13244, time_stamp: '10/7/2054-13/8/2054', card_num: '***********344',acquire_bin:'22343' },

];
@Component({
  selector: 'app-live-simulation',
  templateUrl: './live-simulation.component.html',
  styleUrl: './live-simulation.component.scss'
})
export class LiveSimulationComponent {

  @ViewChild(MatPaginator) paginator ! :MatPaginator;
  isFilterOpen = false;
  displayedColumns: string[] = ['last_simu_date', 'flagged','status','action'];

  displayedColumns2: string[] = ['simu_id', 'rule_group','start_date','end_date','creat_user','creat_date','action'];

  displayedColumns3: string[] = ['simu_id', 'time_stamp','card_num','acquire_bin','action'];
  selectedStatus: string = '';
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);
  dataSource3 = new MatTableDataSource<PeriodicElement3>(ELEMENT_DATA3);
  dropdownSingal = 'Active';
  runSimulation:boolean=false
  simuInactive: boolean = true;
  simuActive: boolean = false;
  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  simulationRun(){
    this.runSimulation=true;
    this.simuInactive = false;
    this.simuActive = true;
  }
  simulationStop(){
    this.runSimulation=false;
    this.simuInactive = true;
    this.simuActive = false;
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

}
