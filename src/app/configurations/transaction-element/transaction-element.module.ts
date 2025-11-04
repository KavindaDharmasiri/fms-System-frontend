import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionElementRoutingModule } from './transaction-element-routing.module';
import { TransactionElementViewComponent } from './transaction-element-view/transaction-element-view.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatAutocomplete, MatAutocompleteTrigger, MatOptgroup, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatChip, MatChipGrid, MatChipInput} from "@angular/material/chips";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddTransactionElementComponent } from './add-transaction-element/add-transaction-element.component';
import {MatDivider} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    TransactionElementViewComponent,
    AddTransactionElementComponent,
  ],
  imports: [
    CommonModule,
    TransactionElementRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTable,
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
    MatRow,
    MatRowDef,
    MatOption,
    MatSelect,
    MatCheckbox,
    MatChip,
    MatChipGrid,
    MatChipInput,
    MatDatepicker,
    MatDatepickerInput,
    MatOptgroup,
    MatPrefix,
    MatRadioButton,
    MatRadioGroup,
    MatSlideToggle,
    MatSlider,
    MatSliderThumb,
    MatSuffix,
    NgxDaterangepickerMd,
    NgxDropzoneModule,
    ReactiveFormsModule,
    MatDivider,
    MatProgressSpinner,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
  ]
})
export class TransactionElementModule { }
