import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { WaterScenarioComponent } from './water-scenario.component';
import {InputSwitchModule, MegaMenuModule, MenuModule, TabMenuModule} from 'primeng';
import { ContainerSettingsModule } from './container-settings/container-settings.module';

@NgModule({
  declarations: [WaterScenarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    KeyFilterModule,
    ButtonModule,
    InputSwitchModule,
    ContainerSettingsModule,
    MegaMenuModule,
    TabMenuModule,
    MenuModule,
  ],
  exports: [WaterScenarioComponent]
})
export class WaterScenarioModule {}
