import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {
  HighRiskTransactionPageComponent
} from "../high-risk-transaction/high-risk-transaction-page/high-risk-transaction-page.component";
import {
  HighRiskTransactionViewComponent
} from "../high-risk-transaction/high-risk-transaction-view/high-risk-transaction-view.component";
import {ValidateTransactionPageComponent} from "./validate-transaction-page/validate-transaction-page.component";
import {ValidateTransactionViewComponent} from "./validate-transaction-view/validate-transaction-view.component";

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:ValidateTransactionPageComponent
      },
      {
        path:'view',
        component:ValidateTransactionViewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidateTransactionRoutingModule { }
