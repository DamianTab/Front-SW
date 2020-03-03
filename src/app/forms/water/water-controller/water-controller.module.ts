import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterControllerComponent } from './water-controller.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WaterControllerComponent],
  imports: [CommonModule, InputSwitchModule, FormsModule],
  exports: [WaterControllerComponent]
})
export class WaterControllerModule {}
