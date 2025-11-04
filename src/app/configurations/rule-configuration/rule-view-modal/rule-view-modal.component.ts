import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SseService} from "../../services/sse-service/sse.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


export interface PeriodicElement {
  id: string;
  TimeStamp: string;
  card_number: string;
  amount: number;
  status: string;
}


@Component({
  selector: 'app-rule-view-modal',
  templateUrl: './rule-view-modal.component.html',
  styleUrl: './rule-view-modal.component.scss'
})
export class RuleViewModalComponent implements OnInit{
  //column names
  displayedColumns: string[] = ['Transaction', 'TimeStamp', 'Card Number', 'Amount(LKR)','Status'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  private elements: PeriodicElement[] = [];

  //child view
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  //constructor
  constructor(
    private sseService: SseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  //oninit
  ngOnInit() {
    this.startRuleTest();
    // const url = 'http://localhost:8084/efms-core-service/api/v1/rule/test-rule';
    //
    // this.sseService.startListening(url, (data: any) => {
    //   const newElement: PeriodicElement = {
    //     transaction_ID: data.message,
    //     date_stamp: new Date().toLocaleDateString(),
    //     time_stamp: new Date().toLocaleTimeString(),
    //     amount: 10,
    //   };
    //   this.elements = [newElement, ...this.elements];
    //   this.dataSource.data = this.elements;
    //
    // }, (error) => {
    //   console.error('SSE connection error:', error);
    // });
  }

  startRuleTest() {
    this.sseService.testRuleViaFetch(this.data, (data) => {
      console.log('Received event:', data);
      // Handle your Transaction DTO here

        const newElement: PeriodicElement = {
          id: data.id,
          TimeStamp: data.timestamp,
          card_number: data.cardSequenceNumber,
          amount: data.amount,
          status: data.ruleFired,
        };
        this.elements = [newElement, ...this.elements];
        this.dataSource.data = this.elements;
    });
  }

  //on destroy
  ngOnDestroy() {
    this.sseService.stopListening();
  }

}
