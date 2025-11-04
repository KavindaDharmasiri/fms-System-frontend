import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DualAuthRoutingModule } from './dual-auth-routing.module';
import { DualAuthComponent } from './dual-auth.component';
import { MatModalViewDualAuthComponent } from './mat-modal-view-dual-auth/mat-modal-view-dual-auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";


@NgModule({
  declarations: [
    DualAuthComponent,
    MatModalViewDualAuthComponent
  ],
  imports: [
    CommonModule,
    DualAuthRoutingModule,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatDatepicker,
    MatFormField,
    MatSelect,
    MatOption,
    MatDivider,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle
  ]
})
export class DualAuthModule { }
