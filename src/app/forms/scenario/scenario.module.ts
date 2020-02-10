import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioComponent } from './scenario.component';
import { ScenarioElementComponent } from './scenario-element/scenario-element.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from 'primeng/spinner';
import { ButtonModule } from 'primeng/button';
import { DashboardModule } from '../../shared/components/dashboard/dashboard.module';
import { TrackModule } from 'src/app/shared/components/dashboard/track/track.module';
import { ScenarioRoutingModule } from './scenario-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [ScenarioComponent, ScenarioElementComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    SpinnerModule,
    ButtonModule,
    DashboardModule,
    TrackModule,
    ScenarioRoutingModule,
    CardModule,
    BrowserAnimationsModule,
  ],
  exports: [ScenarioComponent]
})
export class ScenarioModule { }
