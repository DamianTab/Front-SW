import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackComponent } from './track.component';
import { TrackWidgetModule } from './trackwidget/trackwidget.module'

@NgModule({
  declarations: [TrackComponent],
  imports: [
    CommonModule,
    TrackWidgetModule
  ],
  exports: [TrackComponent, TrackWidgetModule]
})
export class TrackModule { }
