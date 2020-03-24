import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputSwitchModule } from 'primeng';
import { ContainerSettingsComponent } from './container-settings.component';

@NgModule({
  declarations: [ContainerSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    KeyFilterModule,
    InputSwitchModule
  ],
  exports: [ContainerSettingsComponent]
})
export class ContainerSettingsModule {}
