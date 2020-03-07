import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetModule } from '../chart-widget/chart-widget.module';
import { WaterLevelC1ChartComponent } from './water-level-C1-chart.component';

@NgModule({
  declarations: [WaterLevelC1ChartComponent],
  imports: [
    CommonModule,
    ChartWidgetModule
  ],
  exports: [WaterLevelC1ChartComponent]
})
export class WaterLevelC1ChartModule { }
