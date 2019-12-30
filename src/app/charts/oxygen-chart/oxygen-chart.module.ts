import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OxygenChartComponent } from './oxygen-chart.component'
import { ChartModule } from '../chart/chart.module'

@NgModule({
  declarations: [OxygenChartComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [OxygenChartComponent]
})
export class OxygenChartModule { }
