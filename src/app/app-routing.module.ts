import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';

import { Error404Component } from './shared/error_pages/error-404/error-404.component';
import { Error400Component } from './shared/error_pages/error-400/error-400.component';
import { Error401Component } from './shared/error_pages/error-401/error-401.component';
import { Error403Component } from './shared/error_pages/error-403/error-403.component';
import { Error408Component } from './shared/error_pages/error-408/error-408.component';
import { Error429Component } from './shared/error_pages/error-429/error-429.component';
import { Error500Component } from './shared/error_pages/error-500/error-500.component';
import { Error502Component } from './shared/error_pages/error-502/error-502.component';
import { Error503Component } from './shared/error_pages/error-503/error-503.component';
import { MaintenanceComponent } from './shared/error_pages/maintenance/maintenance.component';
import {ForgetPasswordComponent} from "./public/forget-password/forget-password.component";

const routes: Routes = [

  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'forget-password', component: ForgetPasswordComponent, pathMatch: 'full' },
  {
    path: 'monitoring',
    component: DashboardComponent,
    children: [{ path: '', loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule) }]
  },


  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { title: 'Dashboard' }
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: 'configurations',
    loadChildren: () => import('./configurations/configurations.module').then(m => m.ConfigurationsModule),

  },
  {
    path: 'analysis-testing',
    loadChildren: () =>
      import('./analysis-testing/analysis-testing.module').then((m) => m.AnalysisTestingModule),
  },
  {
    path: 'high-risk-transaction',
    loadChildren: () => import('./high-risk-transaction/high-risk-transaction.module').then(m => m.HighRiskTransactionModule),
    data: { title: 'High Risk Transaction' }
  },
  {
    path: 'validate-transaction',
    loadChildren: () => import('./validate-transaction/validate-transaction.module').then(m => m.ValidateTransactionModule),
    data: { title: 'Validate Transaction' }
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: 'typography',
    component: DashboardComponent,
    children: [{ path: '', component: TypographyComponent }],
  },
  {
    path: 'icons',
    component: DashboardComponent,
    children: [{ path: '', component: IconsComponent }],
  },
  {
    path: 'colors',
    component: DashboardComponent,
    children: [{ path: '', component: ColorsComponent }],
  },

  // for checking the error page
  { path: '404', component: Error404Component, pathMatch: 'full' },
  { path: '400', component: Error400Component, pathMatch: 'full' },
  { path: '401', component: Error401Component, pathMatch: 'full' },
  { path: '403', component: Error403Component, pathMatch: 'full' },
  { path: '408', component: Error408Component, pathMatch: 'full' },
  { path: '429', component: Error429Component, pathMatch: 'full' },
  { path: '500', component: Error500Component, pathMatch: 'full' },
  { path: '502', component: Error502Component, pathMatch: 'full' },
  { path: '503', component: Error503Component, pathMatch: 'full' },
  { path: 'site-maintenance', component: MaintenanceComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
