import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactionTemplatesRoutingModule } from './reaction-templates-routing.module';
import { ReactionTemplatesComponent } from './reaction-templates.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@NgModule({
  declarations: [
    ReactionTemplatesComponent
  ],
  imports: [
    CommonModule,
    ReactionTemplatesRoutingModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatDivider,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator
  ]
})
export class ReactionTemplatesModule { }
