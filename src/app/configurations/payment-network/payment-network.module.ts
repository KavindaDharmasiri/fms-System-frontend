import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentNetworkRoutingModule } from './payment-network-routing.module';
import { PaymentNetworkComponent } from './payment-network.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatError, MatFormField, MatLabel, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {RuleGroupRoutingModule} from "../rule-group/rule-group-routing.module";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    PaymentNetworkComponent,
    NewPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentNetworkRoutingModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatPaginatorModule,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatDivider,
    MatSlideToggle,
    MatError,
    MatHint,
    CommonModule,
    RuleGroupRoutingModule,
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
    FormsModule,
    MatDivider,
    MatSlideToggle,
    ReactiveFormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatDatepicker,
    MatDatepickerInput,
    MatDialogContent,
    MatIconButton,
    MatCheckbox,
    MatDialogTitle,
    MatDialogClose
  ]
})
export class PaymentNetworkModule { }
