import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule as PrimeChartModule} from 'primeng/chart';
import { ChartComponent as SwChartComponent } from './chart.component';
import { ChartService as SwChartService}from '../../../services/charts/chart.service'

@NgModule({
  declarations: [SwChartComponent],
  imports: [
    CommonModule,
    PrimeChartModule
  ],
  providers: [SwChartService],
  exports: [SwChartComponent]
})
export class ChartModule { }
