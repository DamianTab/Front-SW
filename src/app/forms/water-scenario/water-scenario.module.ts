import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { WaterScenarioComponent } from './water-scenario.component';
import { InputSwitchModule } from 'primeng';

@NgModule({
  declarations: [WaterScenarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    KeyFilterModule,
    ButtonModule,
    InputSwitchModule
  ],
  exports: [WaterScenarioComponent]
})
export class WaterScenarioModule {}
