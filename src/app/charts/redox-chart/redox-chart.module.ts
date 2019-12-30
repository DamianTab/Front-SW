import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedoxChartComponent } from './redox-chart.component'
import { ChartModule } from '../chart/chart.module'

@NgModule({
  declarations: [RedoxChartComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [RedoxChartComponent]
})
export class RedoxChartModule { }
