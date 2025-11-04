import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { NewAlertingTemplatesComponent } from './reaction-templates/new-alerting-templates/new-alerting-templates.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatDivider} from "@angular/material/divider";
import {MatOption, MatSelect} from "@angular/material/select";


@NgModule({
  declarations: [
    NewAlertingTemplatesComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatSlideToggle,
    MatDivider,
    MatSelect,
    MatOption
  ]
})
export class ConfigurationsModule { }
