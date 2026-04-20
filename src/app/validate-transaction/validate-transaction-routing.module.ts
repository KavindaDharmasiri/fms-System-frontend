import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ValidateTransactionPageComponent} from "./validate-transaction-page/validate-transaction-page.component";
import {ValidateTransactionViewComponent} from "./validate-transaction-view/validate-transaction-view.component";

const routes: Routes = [
  {
    path:'',
    component:ValidateTransactionPageComponent
  },
  {
    path:'view',
    component:ValidateTransactionViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidateTransactionRoutingModule { }
