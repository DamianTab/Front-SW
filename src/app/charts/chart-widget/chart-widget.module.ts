import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetComponent } from './chart-widget.component';
import { ChartModule } from '../chart/chart.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ChartWidgetComponent],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule
  ],
  exports: [ChartWidgetComponent]
})
export class ChartWidgetModule { }
