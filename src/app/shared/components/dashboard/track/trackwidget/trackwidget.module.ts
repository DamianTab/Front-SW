import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackwidgetComponent } from './trackwidget.component'

@NgModule({
  declarations: [TrackwidgetComponent],
  imports: [
    CommonModule
  ],
  exports: [TrackwidgetComponent]
})
export class TrackwidgetModule { }
