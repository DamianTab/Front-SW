import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { OxygenChartComponent } from './oxygen-chart.component';
import { ChartService }from '../../../services/charts/chart.service'

@NgModule({
  declarations: [OxygenChartComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  providers: [ChartService],
  exports: [OxygenChartComponent]
})
export class OxygenChartModule { }
