import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import {ChipsModule, InputSwitchModule, InputTextModule} from 'primeng';
import { ContainerSettingsComponent } from './container-settings.component';

@NgModule({
  declarations: [ContainerSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    KeyFilterModule,
    InputTextModule,
  ],
  exports: [ContainerSettingsComponent]
})
export class ContainerSettingsModule {}
