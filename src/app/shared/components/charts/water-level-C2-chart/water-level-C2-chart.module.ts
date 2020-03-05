import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module';
import { WaterLevelC2ChartComponent } from './water-level-C2-chart.component';

@NgModule({
  declarations: [WaterLevelC2ChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [WaterLevelC2ChartComponent]
})
export class WaterLevelC2ChartModule { }
