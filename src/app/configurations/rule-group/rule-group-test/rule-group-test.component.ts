import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SseService} from "../../services/sse-service/sse.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface PeriodicElement{
  Transaction: string;
  TimeStamp: string;
  card_number: string;
  amount: number;
  status: boolean;
  ruleCollection: { name: string }[]; // NEW
}

@Component({
  selector: 'app-rule-group-view',
  templateUrl: './rule-group-test.component.html',
  styleUrl: './rule-group-test.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RuleGroupTest implements OnInit{
  //column names
  displayedColumns: string[] = [
    'Transaction',
    'TimeStamp',
    'Card Number',
    'Amount(LKR)',
    'Status'
  ];
  expandedElement: any | null = null;
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

    this.sseService.testRuleGroupViaFetch(this.data, (data) => {
      console.log('Received event:', data);

      const newElement = {
        Transaction: data.transaction.tranId,
        TimeStamp: data.transaction.timeOfTransaction,
        card_number: data.transaction.cardNumber,
        amount: data.transaction.amount,
        status: data.transaction.ruleFired,
        ruleCollection: data.firedRuleNames.map((name: string) => ({
          name,
          riskScore: data.transaction.customerRiskScore || 0,
          decision: data.transaction.fraudulent ? 'Decline' : 'Allow'
        }))
      };

      this.elements = [newElement, ...this.elements];
      this.dataSource.data = this.elements;
    });
  }

  //on destroy
  ngOnDestroy() {
    this.sseService.stopListening();
  }

  toggleRow(row: any) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }
}
