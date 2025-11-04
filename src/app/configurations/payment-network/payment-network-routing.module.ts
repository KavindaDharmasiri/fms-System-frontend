import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentNetworkComponent} from "./payment-network.component";
import {NewPaymentComponent} from "./new-payment/new-payment.component";

const routes: Routes = [
  {
    path: '',
    component: PaymentNetworkComponent
  },
  {
    path: 'new-payment/:action/:id',
    component: NewPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentNetworkRoutingModule { }
