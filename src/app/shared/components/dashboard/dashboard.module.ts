import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TrackModule } from './track/track.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CardModule, TrackModule],
  exports: [DashboardComponent, TrackModule]
})
export class DashboardModule {}
