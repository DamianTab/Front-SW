import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module'
import { PhChartComponent } from './ph-chart.component'

@NgModule({
  declarations: [PhChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [PhChartComponent]
})
export class PhChartModule { }
