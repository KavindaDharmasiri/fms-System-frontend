import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { AccordionComponent } from './accordion/accordion.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ChartsComponent } from './charts/charts.component';
import { FormComponent } from './form/form.component';
import { ModalComponent } from './modal/modal.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import { TableComponent } from './table/table.component';
import { TabsComponent } from './tabs/tabs.component';
import { ToastrsSweetalertsComponent } from './toastrs-sweetalerts/toastrs-sweetalerts.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TreeComponent } from './tree/tree.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgChartsModule } from 'ng2-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatModalComponent } from './modal/mat-modal/mat-modal.component';
import { MatTreeModule } from '@angular/material/tree';
import { ToastrModule } from 'ngx-toastr';

import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {DualListBoxComponent} from "./dual-list-box/dual-list-box.component";


@NgModule({
  declarations: [
    AccordionComponent,
    BadgeComponent,
    ButtonsComponent,
    CarouselComponent,
    ChartsComponent,
    FormComponent,
    ModalComponent,
    OffcanvasComponent,
    TableComponent,
    TabsComponent,
    ToastrsSweetalertsComponent,
    TooltipsComponent,
    TreeComponent,
    MatModalComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
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
    MatIconModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    DualListBoxComponent
  ]
})
export class ComponentsModule { }
