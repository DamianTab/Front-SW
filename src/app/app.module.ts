import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WaterModule } from './forms/water/water.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { ScenarioModule } from './forms/scenario/scenario.module';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeModule } from './forms/home/home.module';
import { ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NoResponseInterceptor } from './shared/services/error-handling/no-response.interceptor';
import { ExternalErrorHandler } from './shared/services/error-handling/error.interceptor';
import { InternalErrorHandler } from './shared/services/error-handling/internal-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToastModule,
    WaterModule,
    NavbarModule,
    ScenarioModule,
    HomeModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    MessageService,
    // Kolejnosc ma znaczenie !!! Jak zamienicie to nie bedzie wykrywał timeout'u !!!
    { provide: HTTP_INTERCEPTORS, useClass: ExternalErrorHandler, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoResponseInterceptor, multi: true },
    { provide: ErrorHandler, useClass: InternalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
