import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackComponent } from './track.component';
import { TrackWidgetComponent } from './trackwidget/trackwidget.component'

@NgModule({
  declarations: [TrackComponent, TrackWidgetComponent],
  imports: [
    CommonModule
  ],
  exports: [TrackComponent, TrackWidgetComponent]
})
export class TrackModule { }
