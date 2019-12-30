import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhChartComponent } from './ph-chart.component'
import { ChartModule } from '../chart/chart.module'

@NgModule({
  declarations: [PhChartComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [PhChartComponent]
})
export class PhChartModule { }
