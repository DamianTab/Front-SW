import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackWidgetComponent } from './trackwidget.component'

@NgModule({
  declarations: [TrackWidgetComponent],
  imports: [
    CommonModule
  ],
  exports: [TrackWidgetComponent]
})
export class TrackWidgetModule { }
