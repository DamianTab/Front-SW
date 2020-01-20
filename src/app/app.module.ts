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
import { OxygenChartModule } from './charts/oxygen-chart/oxygen-chart.module';
import { TemperatureChartModule } from './charts/temperature-chart/temperature-chart.module';
import { RedoxChartModule } from './charts/redox-chart/redox-chart.module';
import { PhChartModule } from './charts/ph-chart/ph-chart.module';
import { TableModule } from './shared/components/table/table.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { WaterControllerModule } from './miscellaneous/water-controller/water-controller.module';
import { ScenarioModule } from './forms/scenario/scenario.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,    
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
    SwChartModule,
    ChartWidgetModule,
    OxygenChartModule,
    TemperatureChartModule,
    RedoxChartModule,
    PhChartModule,
    TableModule,
    WaterControllerModule,
    ScenarioModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
