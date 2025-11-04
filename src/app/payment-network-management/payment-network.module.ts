import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentNetworkRoutingModule } from './payment-network-routing.module';
import { PaymentNetworkComponent } from './payment-network/payment-network.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgChartsModule } from 'ng2-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ToastrModule } from 'ngx-toastr';
import { AddPaymentNetworkComponent } from './add-payment-network/add-payment-network.component';
import {MatDivider} from "@angular/material/divider";


@NgModule({
  declarations: [
    PaymentNetworkComponent,
    AddPaymentNetworkComponent
  ],
    imports: [
        CommonModule,
        PaymentNetworkRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatChipsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatDialogModule,
        NgxDropzoneModule,
        NgxDaterangepickerMd.forRoot(),
        NgxMaterialTimepickerModule,
        NgChartsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatTabsModule,
        MatTreeModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatDivider
    ]
})
export class PaymentNetworkModule { }
