import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ScenarioComponent } from './scenario.component';


@NgModule({
  declarations: [ScenarioComponent],
  imports: [
    CommonModule,
    AutoCompleteModule
  ],
  exports: [ScenarioComponent]
})
export class ScenarioModule { }
