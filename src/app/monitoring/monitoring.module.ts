import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: MonitoringComponent }
];

@NgModule({
  declarations: [
    MonitoringComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class MonitoringModule { }