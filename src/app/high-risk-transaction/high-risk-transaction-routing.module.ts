import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";

import {HighRiskTransactionPageComponent} from "./high-risk-transaction-page/high-risk-transaction-page.component";
import {HighRiskTransactionViewComponent} from "./high-risk-transaction-view/high-risk-transaction-view.component";

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:HighRiskTransactionPageComponent
      },
      {
        path:'view',
        component:HighRiskTransactionViewComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighRiskTransactionRoutingModule { }
