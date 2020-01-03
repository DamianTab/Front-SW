import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetComponent } from './chart-widget.component';
import { ChartModule } from '../chart/chart.module';

@NgModule({
  declarations: [ChartWidgetComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [ChartWidgetComponent]
})
export class ChartWidgetModule { }
