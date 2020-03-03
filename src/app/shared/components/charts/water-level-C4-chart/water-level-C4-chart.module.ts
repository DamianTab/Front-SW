import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module';
import { WaterLevelC4ChartComponent } from './water-level-C4-chart.component';

@NgModule({
  declarations: [WaterLevelC4ChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [WaterLevelC4ChartComponent]
})
export class WaterLevelC4ChartModule { }
