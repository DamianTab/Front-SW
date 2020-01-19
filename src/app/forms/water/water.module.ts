import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterComponent } from './water.component';


@NgModule({
  declarations: [WaterComponent],
  imports: [
    CommonModule
  ],
  exports: [WaterComponent]
})
export class WaterModule { }
