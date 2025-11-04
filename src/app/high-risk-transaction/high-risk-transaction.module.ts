import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighRiskTransactionRoutingModule } from './high-risk-transaction-routing.module';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatPaginator} from "@angular/material/paginator";
import {MatOption} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {HighRiskTransactionPageComponent} from "./high-risk-transaction-page/high-risk-transaction-page.component";
import { HighRiskTransactionViewComponent } from './high-risk-transaction-view/high-risk-transaction-view.component';
import { MaskCardPipe } from './card-masks/mask-card/mask-card.pipe';
import { MaskAcquirerBinPipe } from './card-masks/mask-acquirer-BIN/mask-acquirer-bin.pipe';
import {Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatDivider} from "@angular/material/divider";

@NgModule({
  declarations: [
     HighRiskTransactionPageComponent,
     HighRiskTransactionViewComponent,
     MaskCardPipe,
     MaskAcquirerBinPipe
  ],
    imports: [
        CommonModule,
        HighRiskTransactionRoutingModule,
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
        ReactiveFormsModule,
        MatDatepicker,
        MatDatepickerInput,
        MatDivider
    ]
})
export class HighRiskTransactionModule{

}
