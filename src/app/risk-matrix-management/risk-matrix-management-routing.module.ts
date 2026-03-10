import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskMatrixManagementComponent } from './risk-matrix-management.component';

const routes: Routes = [
  {
    path: '',
    component: RiskMatrixManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskMatrixManagementRoutingModule { }