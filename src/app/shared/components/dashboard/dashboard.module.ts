import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

import { DashboardComponent } from './dashboard.component'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
