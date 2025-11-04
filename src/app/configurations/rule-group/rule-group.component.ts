import {Component, input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RuleGroupService} from "../services/rule-group/rule-group.service";
import {ApiPageReqDTO} from "../../shared/dto/ApiPageReqDTO";
import {RuleGroupDTO} from "../../shared/dto/RuleGroupDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {EfmsRuleDTO} from "../../shared/dto/EfmsRuleDTO";
import {RuleService} from "../services/rule/rule.service";
import {PaymentNetworkDTO} from "../../shared/dto/PaymentNetworkDTO";
import {RoleDTO} from "../../shared/dto/RoleDTO";

@Component({
  selector: 'app-rule-group',
  templateUrl: './rule-group.component.html',
  styleUrl: './rule-group.component.scss'
})
export class RuleGroupComponent implements OnInit{
  protected ruleGroupFilter:FormGroup;
  protected ruleGroupList:RuleGroupDTO[] = [];
  protected paymentNetworks: PaymentNetworkDTO[] = [];
  protected allRules: EfmsRuleDTO[] = [];
  protected allRoles: RoleDTO[] = []

  protected totalRecords:number = 0;
  protected pageSize:number = 5;
  protected pageIndex:number = 0;
  protected apiPageReqDTO:ApiPageReqDTO = new ApiPageReqDTO(this.pageIndex,this.pageSize);


  constructor(
    private ruleGroupService:RuleGroupService,
    private ruleService:RuleService,
    private toastrService:ToastrService,
    private fb:FormBuilder) {
    this.ruleGroupFilter = this.fb.group({
      ruleGroupId:[null],
      groupName:[null],
      paymentNetworkId:[null],
      ruleGroupRuleId:[null],
      ruleGroupRoleId:[null],
      status:[null]
    })



  }

  ngOnInit(): void {
    this.loadRuleGroups(this.pageIndex, this.pageSize);
    this.getPaymentNetworks();
    this.getRoles();
    this.getRules();
  }

  @ViewChild(MatPaginator) paginator ! :MatPaginator;
  isFilterOpen = false;
  displayedColumns: string[] = ['paymentNetworkId', 'ruleGroupId', 'groupName', 'acquirer_bin','status','action'];
  selectedStatus: string = '';
  dataSource = new MatTableDataSource<RuleGroupDTO>();
  dropdownSingal = 'Active';
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

  onPageChange(event: PageEvent) {
    this.loadRuleGroups(event.pageIndex, event.pageSize);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  handleSearch() {
    this.loadRuleGroups(this.pageIndex, this.pageSize);
  }

  handleReset() {
    this.ruleGroupFilter.reset();
    this.loadRuleGroups(this.pageIndex, this.pageSize);
  }


loadRuleGroups(pageIndex: number, pageSize: number) {
    if(this.ruleGroupFilter.valid){
      console.log(this.ruleGroupFilter.value);
      this.ruleGroupService.filterRuleGroups(this.ruleGroupFilter.value,new ApiPageReqDTO(pageIndex,pageSize)).subscribe({
        next:(res)=>{
          if (res.success && res.data) {
            console.log(res.data)
            this.ruleGroupList = res.data;
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




  private getPaymentNetworks() {
    this.ruleGroupService.getPaymentNetworks().subscribe({
      next: (response: any) => {
        this.paymentNetworks = response.data;
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  private getRoles() {
    this.ruleGroupService.getAllRoleNames().subscribe({
      next: (response: any) => {

        if (!response) {
          this.toastrService.error("Error Fetching Roles");
          return;
        }

        this.allRoles = response;
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  private getRules() {
    this.ruleService.filterEfmsRules(new EfmsRuleDTO(), new ApiPageReqDTO(0,10000)).subscribe({
      next: (response) => {


        if (response.success === false) {
          this.toastrService.error("Error Fetching Rules");
          return;
        }

        if (response.data === null) {
          this.toastrService.error("Rules Not Found");
          return;
        }else{
          this.allRules = response.data;
        }

      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

}
