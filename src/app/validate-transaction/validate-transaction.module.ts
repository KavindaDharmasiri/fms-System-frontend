import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateTransactionRoutingModule } from './validate-transaction-routing.module';
import { ValidateTransactionViewComponent } from './validate-transaction-view/validate-transaction-view.component';
import {ValidateTransactionPageComponent} from "./validate-transaction-page/validate-transaction-page.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatPaginator} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatSlideToggle} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    ValidateTransactionPageComponent,
    ValidateTransactionViewComponent
  ],
  imports: [
    CommonModule,
    ValidateTransactionRoutingModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDatepicker,
    MatDatepickerInput,
    MatDivider,
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
    ReactiveFormsModule,
    MatHeaderCellDef,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSlideToggle,
    FormsModule
  ]
})
export class ValidateTransactionModule { }
