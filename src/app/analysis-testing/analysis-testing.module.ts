import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisTestingRoutingModule } from './analysis-testing-routing.module';
import { LiveSimulationComponent } from './live-simulation/live-simulation.component';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatPaginator} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import { RuleTestingValidationComponent } from './rule-testing-validation/rule-testing-validation.component';


@NgModule({
  declarations: [
    LiveSimulationComponent,
    RuleTestingValidationComponent
  ],
  imports: [
    CommonModule,
    AnalysisTestingRoutingModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatOption,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    MatHeaderCellDef,
    MatDatepicker,
    MatDatepickerInput,
    MatTab,
    MatTabGroup,
    MatRadioButton,
    MatRadioGroup
  ]
})
export class AnalysisTestingModule { }
