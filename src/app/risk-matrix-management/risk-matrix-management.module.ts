import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiskMatrixManagementRoutingModule } from './risk-matrix-management-routing.module';
import { RiskMatrixManagementComponent } from './risk-matrix-management.component';

@NgModule({
  declarations: [
    RiskMatrixManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RiskMatrixManagementRoutingModule
  ]
})
export class RiskMatrixManagementModule { }