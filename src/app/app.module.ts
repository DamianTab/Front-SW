import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WaterModule } from './forms/water/water.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { ScenarioModule } from './forms/scenario/scenario.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/services/error-interceptor/error.interceptor';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    WaterModule,
    NavbarModule,
    ScenarioModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
