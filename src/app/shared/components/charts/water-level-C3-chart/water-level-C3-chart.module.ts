import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module'
import { WaterLevelC3ChartComponent } from './water-level-C3-chart.component'

@NgModule({
  declarations: [WaterLevelC3ChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [WaterLevelC3ChartComponent]
})
export class WaterLevelC3ChartModule { }
