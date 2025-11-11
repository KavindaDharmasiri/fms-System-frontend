import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorsComponent } from './colors/colors.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TypographyComponent } from './typography/typography.component';
import { NgChartsModule } from 'ng2-charts';
import { IconsComponent } from './icons/icons.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './public/login/login.component';
import { ForgetPasswordComponent } from './public/forget-password/forget-password.component';
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
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth-guard/interceptor/auth.interceptor";
import {LogoutInterceptor} from "./auth-guard/interceptor/logout.interceptor";
import {LoadingInterceptor} from "./auth-guard/interceptor/LoadingInterceptor";
import {DatePipe} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RegisterComponent } from './public/register/register.component';


// import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorsComponent,
    TypographyComponent,
    IconsComponent,
    FooterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    Error404Component,
    Error400Component,
    Error401Component,
    Error403Component,
    Error408Component,
    Error429Component,
    Error500Component,
    Error502Component,
    Error503Component,
    MaintenanceComponent,
    RegisterComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatTabsModule,
        MatCheckboxModule,
        MatTableModule,
        MatRadioModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        NgChartsModule,
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule,
        MatProgressSpinnerModule,
    ],
  providers: [
    DatePipe,
    provideClientHydration(),
    provideAnimationsAsync('noop'),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: LogoutInterceptor,
      multi: true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
