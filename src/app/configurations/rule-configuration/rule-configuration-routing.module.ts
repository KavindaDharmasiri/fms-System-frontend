import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RuleConfigurationPageComponent} from "./rule-configuration-page/rule-configuration-page.component";
import {AddRuleConfigurationComponent} from "./add-rule-configuration/add-rule-configuration.component";
import {ViewRuleComponent} from "./view-rule/view-rule.component";
import {NewRuleGroupComponent} from "../rule-group/new-rule-group/new-rule-group.component";

const routes: Routes = [
  {
    path:'',
    component:RuleConfigurationPageComponent
  },
  {
    path:'add-rule',
    component:AddRuleConfigurationComponent
  },
  {
    path: 'edit-rule/:id',
    component: AddRuleConfigurationComponent
  },
  {
    path: 'view-rule/:id',
    component:ViewRuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleConfigurationRoutingModule { }
