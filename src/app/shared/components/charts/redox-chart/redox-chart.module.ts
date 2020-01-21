import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module'
import { RedoxChartComponent } from './redox-chart.component'

@NgModule({
  declarations: [RedoxChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [RedoxChartComponent]
})
export class RedoxChartModule { }
