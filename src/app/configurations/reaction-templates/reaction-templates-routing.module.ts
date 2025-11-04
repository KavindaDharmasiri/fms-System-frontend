import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReactionTemplatesComponent} from "./reaction-templates.component";
import {NewAlertingTemplatesComponent} from "./new-alerting-templates/new-alerting-templates.component";

const routes: Routes = [
  {
    path: '',
    component: ReactionTemplatesComponent
  },
  {
    path: 'add-new-alerting-template/:action/:id',
    component: NewAlertingTemplatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactionTemplatesRoutingModule { }
