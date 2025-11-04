import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransactionElementViewComponent} from "./transaction-element-view/transaction-element-view.component";
import {AddTransactionElementComponent} from "./add-transaction-element/add-transaction-element.component";


const routes: Routes = [
  {
    path:'',
    component:TransactionElementViewComponent
  },
  {
    path:"add-element",
    component:AddTransactionElementComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionElementRoutingModule { }
