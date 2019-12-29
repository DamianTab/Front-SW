import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackComponent } from './track.component';
import { TrackwidgetComponent } from './trackwidget/trackwidget.component'

@NgModule({
  declarations: [TrackComponent, TrackwidgetComponent],
  imports: [
    CommonModule
  ],
  exports: [TrackComponent, TrackwidgetComponent]
})
export class TrackModule { }
