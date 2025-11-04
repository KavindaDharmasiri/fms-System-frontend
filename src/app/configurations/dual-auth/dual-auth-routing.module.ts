import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DualAuthComponent} from "./dual-auth.component";

const routes: Routes = [
  {
    path: '',
    component: DualAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DualAuthRoutingModule { }
