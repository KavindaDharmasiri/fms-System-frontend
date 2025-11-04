import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {RuleViewModalComponent} from "../rule-view-modal/rule-view-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EfmsRuleDTO, EfmsRuleValueDto} from "../../../shared/dto/EfmsRuleDTO";
import { v4 as uuidv4 } from 'uuid';

import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {throwError} from "rxjs";
import {RuleService} from "../../services/rule/rule.service";
import {TransactionElementService} from "../../services/transaction-element/transaction-element.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PaymentNetworkDTO} from "../../../shared/dto/PaymentNetworkDTO";
import {text} from "express";





@Component({
  selector: 'app-add-rule-configuration',
  templateUrl: './add-rule-configuration.component.html',
  styleUrl: './add-rule-configuration.component.scss'
})
export class AddRuleConfigurationComponent implements OnInit{


  efmsRuleDTO: EfmsRuleDTO = new EfmsRuleDTO();
  displayedColumns: string[] = ['efmsElementId', 'operator', 'value','riskScore','action'];
  selectedStatus: string = '';
  protected efmsElements: any[] = [];
  protected isEditMode: boolean = false;
  protected efmsRuleId: string ='';
  protected ruleUuid: string = this.generateCode();
  protected efmsRule : EfmsRuleDTO = new EfmsRuleDTO();
  efmsElementData:any;
  selectedOption: any;
  ruleValueList:any[]=[];
  finalRiskScore:number=0.0;
  isEqule:boolean=true
  isNotEqual:boolean=true
  isGreater:boolean=true
  isLess:boolean=true
  isGreaterEqual:boolean=true
  isLessEqual:boolean=true
  isIn:boolean=true
  isNotIN:boolean=true
  uuId:string='';
  isboValue:boolean=true
  operationsList:any=[]
  elementValue:any[]=[];
  paymentNetworkList:any[]=[];
  operators:any;
  dataSource = new MatTableDataSource<EfmsRuleValueDto>(this.ruleValueList);
  addRuleValueForm: FormGroup;
  netId: any;
  constructor(public dialog: MatDialog,
              private ruleService:RuleService,
              private transactionElementService: TransactionElementService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService:ToastrService,
              public fb:FormBuilder,
              ) {
    this.addRuleValueForm=fb.group({
      paymentNetworkId:[""],
      efmsRuleId:[""],
      ruleName:[""],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      status:[""],
      efmsElementId:[""],
      riskWeight:[0],
      value:[""],
      rgMin:[''],
      rgMax:[''],
      loNotIN:[''],
      loMIn:[''],
      coLessEqual:[''],
      coGreaterEqual:[''],
      coLess:[''],
      coGreater:[''],
      coNotEqual:[''],
      coEqual:[''],
      boValue:[false]

    })
    this.getElements();
    this.getPaymentNetwork();
    this.uuId=uuidv4();
    console.log("UUID" ,this.uuId)

    this.efmsRuleId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = this.router.url.includes("edit-rule") && this.efmsRuleId !== '';
    this.isEditMode && this.getEfmsRule()
  }

  ngOnInit(): void {
    this.efmsRule.ruleUuid = this.ruleUuid;
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
        console.log(res)
        this.addRuleValueForm.patchValue({...res.data, status: res.data.status === "ACTIVE" ? true : false});
        this.ruleValueList = res.data.efmsRuleConditionCollection || [];
        this.efmsRule = res.data;
        this.efmsRule.ruleUuid = res.data.ruleUuid || this.ruleUuid;
        this.netId = res.data.paymentNetworkId;
        this.dataSource = new MatTableDataSource<EfmsRuleValueDto>(this.ruleValueList);
      }
    })
  }

  openModal(){
    this.efmsRuleDTO.efmsRuleId=0;
    this.efmsRuleDTO.ruleUuid=this.uuId;
    this.efmsRuleDTO.ruleName=this.addRuleValueForm.get("ruleName")?.value;
    this.efmsRuleDTO.finalRule='';
    this.efmsRuleDTO.description="";
    this.efmsRuleDTO.fromDate=this.addRuleValueForm.get("fromDate")?.value;
    this.efmsRuleDTO.toDate=this.addRuleValueForm.get("toDate")?.value;
    this.efmsRuleDTO.status=this.addRuleValueForm.get("status")?.value? "ACTIVE":"INACTIVE"
    this.efmsRuleDTO.finalRiskScore=this.finalRiskScore;
    this.efmsRuleDTO.paymentNetworkId=this.addRuleValueForm.get("paymentNetworkId")?.value;
    this.efmsRuleDTO.efmsRuleConditionCollection=this.ruleValueList

    if(this.addRuleValueForm.valid){
      let dialogRef = this.dialog.open(RuleViewModalComponent, {
        width: '900px',
        data: this.efmsRuleDTO
      });
    }else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Please select payment network."
      });
    }

  }

  generateCode(): string {
    const prefix = 'RL';
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // ensures 7 digits
    return `${prefix}${randomNumber}`;
  }


  deleteData(element: EfmsRuleValueDto) {
    const index = this.dataSource.data.indexOf(element)
    console.log(element)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index >= 0) {

          this.ruleValueList.splice(index, 1);
          this.dataSource = new MatTableDataSource<EfmsRuleValueDto>([...this.ruleValueList]);
        }
        Swal.fire({
          title: "Deleted!", text: "Your file has been deleted.", icon: "success"
        });
        this.setRiskScore();
      }
    });

  }

  private setRiskScore(){
    this.finalRiskScore=0;
    for (const element of this.ruleValueList) {
      this.finalRiskScore+=Number(element.riskScore);
    }
  }

  private getElements() {
    this.transactionElementService.getByStatus().subscribe({
      next: (response: any) => {
        this.efmsElements = response.data;

      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  getElementData() {
    const id=this.addRuleValueForm.get("efmsElementId")?.value

    this.transactionElementService.getDataById(id).subscribe(
      (res:any)=>{
        this.efmsElementData=res.data;
        console.log(this.efmsElementData)
        this.setElementData();
      }
    )
  }

  setElementData(){
    this.operators = JSON.parse(this.efmsElementData.operator);
    this.elementValue=JSON.parse(this.efmsElementData.value)
    const comparisonOps = this.operators.find((op: any) => op['Comparison Operators'])?.['Comparison Operators'] || [];
    const listOps = this.operators.find((op: any) => op['List Operators'])?.['List Operators'] || [];

    this.addRuleValueForm.patchValue({
      riskWeight:this.efmsElementData.riskWeight,
      rgMin:this.getRangeValue(this.operators, 'rangeMin'),
      rgMax:this.getRangeValue(this.operators, 'rangeMax'),

    })


    this.isEqule = comparisonOps.includes('EQUAL');
    this.isNotEqual = comparisonOps.includes('NOT_EQUAL');
    this.isGreater = comparisonOps.includes('GREATERTHAN');
    this.isLess = comparisonOps.includes('LESSTHAN');
    this.isGreaterEqual = comparisonOps.includes('GREATERTHAN_OR_EQUAL');
    this.isLessEqual = comparisonOps.includes('LESSTHAN_OR_EQUAL');

    // ✅ List Operators
    this.isIn = listOps.includes('IN');
    this.isNotIN = listOps.includes('NOT_IN');
    // Boolean Operator (assuming one boolean key)
    this.isboValue= this.operators.find((op: { [x: string]: string; }) => op['Boolean Operators'] === 'true') ? true : false;


  }

  getRangeValue(operators: any[], key: string): number | null {
    const rangeObj = operators.find(op => op['Range Operators']);
    if (rangeObj && rangeObj['Range Operators']) {
      const val = rangeObj['Range Operators'].find((r: any) => key in r);
      return val ? val[key] : null;
    }
    return null;
  }

  private getPaymentNetwork() {
    this.transactionElementService.getPaymentNetworks().subscribe({
      next: (response: any) => {
        this.paymentNetworkList = response.data;
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  saveRule() {
    let efmsRuleDTO:EfmsRuleDTO=new EfmsRuleDTO();

    this.efmsRuleDTO.efmsRuleId=0;
    this.efmsRuleDTO.ruleUuid= this.efmsRule.ruleUuid;
    this.efmsRuleDTO.ruleName=this.addRuleValueForm.get("ruleName")?.value;
    this.efmsRuleDTO.finalRule='';
    this.efmsRuleDTO.description="";
    this.efmsRuleDTO.fromDate=this.addRuleValueForm.get("fromDate")?.value;
    this.efmsRuleDTO.toDate=this.addRuleValueForm.get("toDate")?.value;
    this.efmsRuleDTO.status=this.addRuleValueForm.get("status")?.value? "ACTIVE":"INACTIVE"
    this.efmsRuleDTO.finalRiskScore=this.finalRiskScore;
    this.efmsRuleDTO.paymentNetworkId=this.addRuleValueForm.get("paymentNetworkId")?.value;
    this.efmsRuleDTO.efmsRuleConditionCollection=this.ruleValueList
    console.log(this.efmsRuleDTO)
    this.ruleService.saveEfmsRule(this.efmsRuleDTO).pipe(
      catchError(
        (err) =>{
          console.log(err)
          Swal.fire(
            ""+err.error.message,
            '' ,
            'error'
          );
          return throwError(err);
        }
      )
    ).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.success){
          Swal.fire(
            "Rule successfully Added.",
            '',
            'success'
          )
            this.router.navigate(['/configurations/rule-configuration/'])

        }else {
          Swal.fire(
            "Rule Added Unsuccessful",
            '' ,
            'error'
          );
        }
      }
    )
  }


  editRule() {
    if (this.addRuleValueForm.invalid) {
      this.addRuleValueForm.markAllAsTouched();
      this.toastrService.error("Please fill all the required fields");
      return;
    }

    let updatedDto: EfmsRuleDTO = new EfmsRuleDTO();
    const efmsRuleId = this.efmsRuleId;

    updatedDto.efmsRuleId = Number(this.efmsRuleId);
    updatedDto.ruleUuid = this.efmsRule.ruleUuid;
    updatedDto.ruleName = this.addRuleValueForm.get("ruleName")?.value;
    updatedDto.finalRule = '';
    updatedDto.description = "";
    updatedDto.fromDate = this.addRuleValueForm.get("fromDate")?.value;
    updatedDto.toDate = this.addRuleValueForm.get("toDate")?.value;
    updatedDto.status = this.addRuleValueForm.get("status")?.value ? "ACTIVE" : "INACTIVE";
    updatedDto.finalRiskScore = this.finalRiskScore;
    updatedDto.paymentNetworkId = this.addRuleValueForm.get("paymentNetworkId")?.value;

    this.ruleValueList.forEach(condition => {
      condition.efmsRuleId = efmsRuleId;
      condition.efmsRuleConditionId = null;
    });

    updatedDto.efmsRuleConditionCollection = this.ruleValueList;

    this.ruleService.updateEfmsRule(updatedDto).pipe(
      catchError((err) => {
        console.error(err);
        Swal.fire(
          "" + err.error.message,
          '',
          'error'
        );
        return throwError(err);
      })
    ).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        Swal.fire(
          res.message,
          '',
          'success'
        );
        this.resetValue();
      } else {
        Swal.fire(
          "Rule Update Unsuccessful",
          '',
          'error'
        );
      }
    });
  }


  private resetValue(){
    this.addRuleValueForm.reset();
    this.dataSource = new MatTableDataSource<EfmsRuleValueDto>([]);
    this.finalRiskScore=0.0
    this.isEqule=true
    this.isNotEqual=true
    this.isGreater=true
    this.isLess=true
    this.isGreaterEqual=true
    this.isLessEqual=true
    this.isIn=true
    this.isNotIN=true
    this.isboValue=true

  }

  addRules() {
    const ruleValue:EfmsRuleValueDto={
      efmsElementId:this.addRuleValueForm.get("efmsElementId")?.value,
      operator:this.selectedOption,
      value:this.addRuleValueForm.get("value")?.value,
      riskScore:this.addRuleValueForm.get("riskWeight")?.value,

    }

    this.ruleValueList.push(ruleValue);
    //  this.finalRiskScore+=this.addRuleValueForm.get("riskWeight")?.value;
    console.log(this.ruleValueList)
    this.setRiskScore();
    console.log(this.finalRiskScore)
    console.log(this.ruleValueList)
    this.dataSource = new MatTableDataSource<EfmsRuleValueDto>(this.ruleValueList);

  }

  setOperations(option:string) {
    this.selectedOption=option;
    this.operationsList.push(option)

  }

  resetFiled() {
    this.resetValue();
  }
}
