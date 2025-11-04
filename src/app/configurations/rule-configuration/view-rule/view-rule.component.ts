import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EfmsRuleDTO, EfmsRuleValueDto} from "../../../shared/dto/EfmsRuleDTO";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RuleService} from "../../services/rule/rule.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {EfmsRuleConditionDTO} from "../../../shared/dto/EfmsRuleConditionDTO";


export interface PeriodicElement {
  field: string;
  operation: string;
  value: string;
}

@Component({
  selector: 'app-view-rule',
  templateUrl: './view-rule.component.html',
  styleUrl: './view-rule.component.scss',
})
export class ViewRuleComponent implements OnInit{
  protected ruleForm:FormGroup;
  protected efmsRuleId: string ='';
  protected efmsRule: EfmsRuleDTO = new EfmsRuleDTO();

  displayedColumns: string[] = ['efmsElementId', 'operator', 'value'];
  selectedStatus: string = '';
  // protected efmsElements: any[] = [];
  // efmsElementData:any;
  // selectedOption: any;
  ruleValueList:any[]=[];
  // finalRiskScore:number=0.0;
  // isEqule:boolean=true
  // isNotEqual:boolean=true
  // isGreater:boolean=true
  // isLess:boolean=true
  // isGreaterEqual:boolean=true
  // isLessEqual:boolean=true
  // isIn:boolean=true
  // isNotIN:boolean=true
  // uuId:string='';
  // isboValue:boolean=true
  // operationsList:any=[]
  // elementValue:any[]=[];
  // paymentNetworkList:any[]=[];
  operators:any;
  dataSource = new MatTableDataSource<EfmsRuleValueDto>(this.ruleValueList);
  constructor(public dialog: MatDialog,
              private ruleService:RuleService,
              private toastrService:ToastrService,
              private route:ActivatedRoute,
              // private transactionElementService: TransactionElementService,
              private fb:FormBuilder) {
    this.ruleForm = this.fb.group({
      coEqual: [false],
      coNotEqual: [false],
      coGreater: [false],
      coLess: [false],
      coGreaterEqual: [false],
      coLessEqual: [false],
      loMIn: [false],
      loNotIN: [false],
      rgMin: [''],
      rgMax: [''],
      boValue: [false],
      // Add others if needed
    });

  }

  ngOnInit(): void {
    this.efmsRuleId = this.route.snapshot.paramMap.get('id') || '';
    this.getEfmsRule()
  }

  getEfmsRule(){
    const id = Number.parseInt(this.efmsRuleId);
    if (isNaN(id)) {
      this.toastrService.error("Invalid Rule ID");
      return;
    }

    this.ruleService.getEfmsRuleById(id).subscribe(res=>{
      if (res.success === false) {
        this.toastrService.error("Error Fetching Rule");
        return;
      }
      if (res.data === null) {
        this.toastrService.error("Rule Not Found");
        return;
      }else{
        this.efmsRule = res.data;
      }
    })
  }


  get conditionDataSource(): EfmsRuleConditionDTO[] {
    return this.efmsRule?.efmsRuleConditionCollection || [];
  }


}
