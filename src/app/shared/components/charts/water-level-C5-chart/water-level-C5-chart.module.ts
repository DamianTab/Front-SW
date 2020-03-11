import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module';
import { WaterLevelC5ChartComponent } from './water-level-C5-chart.component';

@NgModule({
  declarations: [WaterLevelC5ChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [WaterLevelC5ChartComponent]
})
export class WaterLevelC5ChartModule { }
