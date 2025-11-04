import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleGroupRoutingModule } from './rule-group-routing.module';
import { RuleGroupComponent } from './rule-group.component';
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
import { NewRuleGroupComponent } from './new-rule-group/new-rule-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import { RuleGroupTest } from './rule-group-test/rule-group-test.component';
import {MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { RuleGroupViewComponent } from './rule-group-view/rule-group-view.component';
import {MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    RuleGroupComponent,
    NewRuleGroupComponent,
    RuleGroupTest,
    RuleGroupViewComponent
  ],
  imports: [
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
export class RuleGroupModule { }
