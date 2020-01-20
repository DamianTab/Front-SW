import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module'
import { OxygenChartComponent } from './oxygen-chart.component'

@NgModule({
  declarations: [OxygenChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [OxygenChartComponent]
})
export class OxygenChartModule { }
