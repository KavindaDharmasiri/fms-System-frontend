import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RuleGroupService} from "../../services/rule-group/rule-group.service";
import {RuleService} from "../../services/rule/rule.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RuleGroupDTO} from "../../../shared/dto/RuleGroupDTO";

@Component({
  selector: 'app-rule-group-view',
  templateUrl: './rule-group-view.component.html',
  styleUrl: './rule-group-view.component.scss'
})
export class RuleGroupViewComponent implements OnInit {
  protected ruleGroupForm:FormGroup;
  protected ruleGroupId: string ='';
  protected ruleGroup: RuleGroupDTO = new RuleGroupDTO();
  public efmsRuleConditionCollection:any;

  dropdownSingal = 'Active';

  ruleGroupName:string = "Rule Group Name";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private ruleGroupService:RuleGroupService,
    private ruleService:RuleService,
    private toastrService:ToastrService,
    private fb:FormBuilder) {
    this.ruleGroupForm = this.fb.group({
      groupName: [""],
      paymentNetworkId: [null],
    })
  }

  ngOnInit(): void {
    this.ruleGroupId = this.route.snapshot.paramMap.get('id') || '';
    this.getRuleGroup()
  }

  getRuleGroup(){

    const id = Number.parseInt(this.ruleGroupId);

    if (isNaN(id)) {
      this.toastrService.error("Invalid Rule Group ID");
      return;
    }

    this.ruleGroupService.getRuleGroupById(id).subscribe(res=>{
      if (res.success === false) {
        this.toastrService.error("Error Fetching Rule Group");
        return;
      }

      if (res.data === null) {
        this.toastrService.error("Rule Group Not Found");
        return;
      }else{
        this.ruleGroup = res.data;

        console.log(
          this.ruleGroup?.ruleGroupRuleCollection?.[0]?.efmsRule?.fmsRuleConditionCollection?.[0].efmsElementOperator);
         // this.efmsRuleConditionCollection= this.ruleGroup?.ruleGroupRuleCollection?.efmsRule?.efmsRuleConditionCollection?.[0]
        // this.efmsElementOperator=this.ruleGroup?.ruleGroupRuleCollection?.[0]?.efmsRule?.efmsRuleConditionCollection?.[0].efmsElementOperator
        // console.log(this.efmsElementOperator)
        this.ruleGroupForm.patchValue(res.data);

      }
    })
  }

  // protected readonly JSON = JSON;
  // protected readonly String = String;
  // protected readonly JSON = JSON;
  // protected readonly String = String;
}
