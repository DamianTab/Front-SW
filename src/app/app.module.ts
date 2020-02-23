import { NgModule } from '@angular/core';
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
import { NoResponseInterceptor } from './shared/services/no-response-interceptor/no-response.interceptor';
import { ErrorInterceptor } from './shared/services/error-interceptor/error.interceptor';

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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
