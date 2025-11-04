import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatModalComponent} from "../../../components/modal/mat-modal/mat-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {RuleViewModalComponent} from "../rule-view-modal/rule-view-modal.component";
import {RuleService} from "../../services/rule/rule.service";
import {EfmsRuleDTO,} from "../../../shared/dto/EfmsRuleDTO";
import {ApiPageReqDTO} from "../../../shared/dto/ApiPageReqDTO";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {TransactionElementService} from "../../services/transaction-element/transaction-element.service";
import {ToastrService} from "ngx-toastr";



export interface PeriodicElement {
  rule_id: string;
  rule_name: string;
  payment_net: string;
  status:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { rule_id: '001 ', rule_name: 'Rule name', payment_net: '132242343',status:'Active' },
  { rule_id: '002', rule_name: 'Rule name', payment_net: '132242343' ,status:'Inactive' },
  { rule_id: '003', rule_name: 'Rule name', payment_net: '132242343' ,status:'Active' },
  { rule_id: '004', rule_name: 'Rule name', payment_net: '132242343' ,status:'Active' },
  { rule_id: '005', rule_name: 'Rule name', payment_net: '132242343' ,status:'Inactive' },
];

@Component({
  selector: 'app-rule-configuration-page',
  templateUrl: './rule-configuration-page.component.html',
  styleUrl: './rule-configuration-page.component.scss'
})
export class RuleConfigurationPageComponent implements OnInit{
  protected totalRecords:number = 0;
  protected pageSize:number = 5;
  protected pageIndex:number = 0;
  protected apiPageReqDTO:ApiPageReqDTO = new ApiPageReqDTO(this.pageIndex,this.pageSize);

  @ViewChild(MatPaginator) paginator ! :MatPaginator;
  isFilterOpen = false;
  displayedColumns: string[] = ['efmsRuleId', 'ruleName', 'paymentNetworkId','status','action'];
  selectedStatus: string = '';
  dataSource = new MatTableDataSource<any>([]);
  dropdownSingal = 'Active';
  page:number=0;
  size:number=5;
  currentPage = 0; // Start from page 1
  ruleList:EfmsRuleDTO[]=[];
  ruleFilterForm: FormGroup;
  paymentNetworkList: any[]=[];
  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  constructor(
      private ruleService:RuleService,
      public fb:FormBuilder,
      public transactionElementService:TransactionElementService,
      private toastrService:ToastrService,

  ) {
    this.ruleFilterForm=fb.group({
      efmsRuleId:[""],
      ruleName:[""],
      paymentNetworkId:[""],
      status:[""],
      element1:[""],
      element2:[""],
      element3:[""],
      ruleUuid: [""],
    })
    // this.getAllRules();
    this.getAllPaymentNetwork();
    // this.loadRules(this.pageIndex, this.pageSize);
  }

  ngOnInit(): void {

  }

  private getAllPaymentNetwork() {
    this.transactionElementService.getPaymentNetworks().subscribe({
      next: (response: any) => {
        this.paymentNetworkList = response.data;
        console.log(this.paymentNetworkList)
        this.loadRules(this.pageIndex, this.pageSize);
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  private getAllRules(){

    if(this.ruleFilterForm.valid){
      console.log(this.ruleFilterForm.value);
      this.ruleService.filterEfmsRules(this.ruleFilterForm.value, new ApiPageReqDTO(this.page,this.size)).subscribe(
        (res:any)=>{
          // this.ruleList = res.data
          // console.log(this.ruleList)
          this.totalRecords = res.metadata?.pagination?.totalElements || 0;
          this.pageIndex = res.metadata?.pagination?.pageNumber || 0;
          this.pageSize = res.metadata?.pagination?.pageSize || 0;
        }
      )
    }
  }

  private isFilterEmpty(data: { [key: string]: any }): boolean {
    // true if every value is '' or null or undefined
    return Object.values(data).every(v => v === '' || v == null);
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


  onPageChange(event: PageEvent) {
    this.loadRules(event.pageIndex, event.pageSize);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private loadRules(pageIndex: number, pageSize: number) {
      if(this.ruleFilterForm.valid){
        this.ruleService.filterEfmsRules(this.ruleFilterForm.value,new ApiPageReqDTO(pageIndex,pageSize)).subscribe({
          next:(res)=>{
            if (res.success && res.data) {

              this.ruleList= res.data.map((rule: any) => {
                const matchedNetwork = this.paymentNetworkList.find(
                  (network: any) => network.paymentNetworkId === rule.paymentNetworkId
                );
                return {
                  ...rule,
                  networkName: matchedNetwork ? matchedNetwork.networkName : 'Unknown'

                };
              });

              // this.ruleList = res.data;
              this.totalRecords = res.metadata?.pagination?.totalElements || 0;
              this.pageIndex = res.metadata?.pagination?.pageNumber || 0;
              this.pageSize = res.metadata?.pagination?.pageSize || 0;
              // this.dataSource = new MatTableDataSource(res.data);
              // this.dataSource.paginator = this.paginator;
            }else {
              this.toastrService.error("Error Fetching Rule Groups");
            }


          },
          error:(err)=>{
            console.log(err);
          }
        })
      }

  }


  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex ; // MatPaginator uses 0-based index
      this.size = this.paginator.pageSize;
      this.loadRules(this.pageIndex, this.pageSize);
    });
    this.loadRules(this.pageIndex, this.pageSize);
  }


  searchRules() {
    console.log(this.ruleFilterForm.value)
    this.loadRules(this.pageIndex, this.pageSize);
  }

  resetFiled() {
    this.ruleFilterForm.reset();
    this.loadRules(this.pageIndex, this.pageSize);
  }


}
