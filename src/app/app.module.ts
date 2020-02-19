import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WaterModule } from './forms/water/water.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { ScenarioModule } from './forms/scenario/scenario.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './forms/home/home.module';
import { ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
