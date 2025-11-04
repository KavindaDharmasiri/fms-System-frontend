import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleConfigurationRoutingModule } from './rule-configuration-routing.module';
import { RuleConfigurationPageComponent } from './rule-configuration-page/rule-configuration-page.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatPaginator} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";
import { AddRuleConfigurationComponent } from './add-rule-configuration/add-rule-configuration.component';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import { RuleViewModalComponent } from './rule-view-modal/rule-view-modal.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewRuleComponent } from './view-rule/view-rule.component';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDivider} from "@angular/material/divider";


@NgModule({
  declarations: [
    RuleConfigurationPageComponent,
    AddRuleConfigurationComponent,
    RuleViewModalComponent,
    ViewRuleComponent
  ],
  imports: [
    CommonModule,
    RuleConfigurationRoutingModule,
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
    MatCheckbox,
    MatSlideToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatPrefix,
    MatSuffix,
    FormsModule,
    ReactiveFormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatDivider
  ]
})
export class RuleConfigurationModule { }
