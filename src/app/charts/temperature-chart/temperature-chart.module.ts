import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module'
import { TemperatureChartComponent } from './temperature-chart.component'

@NgModule({
  declarations: [TemperatureChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [TemperatureChartComponent]
})
export class TemperatureChartModule { }
