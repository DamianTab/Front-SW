import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { DashboardModule } from './shared/components/dashboard/dashboard.module';
import { WaterModule } from './forms/water/water.module';
import { ChartModule as SwChartModule } from './charts/chart/chart.module';
import { ChartWidgetModule } from './charts/chart-widget/chart-widget.module';
import { OxygenChartComponent } from './charts/oxygen-chart/oxygen-chart.component';
import { TemperatureChartComponent } from './charts/temperature-chart/temperature-chart.component';
import { RedoxChartComponent } from './charts/redox-chart/redox-chart.component';
import { PhChartComponent } from './charts/ph-chart/ph-chart.component';
import { TableModule } from './shared/components/table/table.module';

@NgModule({
  declarations: [
    AppComponent,
    OxygenChartComponent,
    TemperatureChartComponent,
    RedoxChartComponent,
    PhChartComponent
  ],
  imports: [
    BrowserModule,
    PanelModule,
    BrowserAnimationsModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    FieldsetModule,
    DashboardModule,
    WaterModule,
    AppRoutingModule,
    SwChartModule,
    ChartWidgetModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
