import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RuleGroupComponent} from "./rule-group.component";
import {NewRuleGroupComponent} from "./new-rule-group/new-rule-group.component";
import {RuleGroupViewComponent} from "./rule-group-view/rule-group-view.component";


const routes: Routes = [
  {
    path: '',
    component: RuleGroupComponent
  },
  {
    path: 'new-rule-group',
    component: NewRuleGroupComponent
  },
  {
    path: 'edit-rule-group/:id',
    component: NewRuleGroupComponent
  },
  {
    path: 'view-rule-group/:id',
    component: RuleGroupViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleGroupRoutingModule { }
