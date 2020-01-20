import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioComponent } from './scenario.component';
import { ScenarioElementComponent } from './scenario-element/scenario-element.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from 'primeng/spinner';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [ScenarioComponent, ScenarioElementComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    SpinnerModule,
    ButtonModule
  ],
  exports: [ScenarioComponent, ScenarioElementComponent]
})
export class ScenarioModule { }
