import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureChartComponent } from './temperature-chart.component'
import { ChartModule } from '../chart/chart.module'

@NgModule({
  declarations: [TemperatureChartComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [TemperatureChartComponent]
})
export class TemperatureChartModule { }
