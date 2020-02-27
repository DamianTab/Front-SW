import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartWidgetComponent } from './chart-widget.component';
import { ChartModule } from '../chart/chart.module';
import { ButtonModule } from 'primeng/button';
import {CalendarModule, InputSwitchModule, KeyFilterModule} from 'primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ChartWidgetComponent],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    InputSwitchModule,
    KeyFilterModule
  ],
  exports: [ChartWidgetComponent]
})
export class ChartWidgetModule { }
