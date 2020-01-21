import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterRoutingModule } from './forms/water/water-routing.module';
import { ScenarioRoutingModule } from './forms/scenario/scenario-routing.module';
import { WaterComponent } from './forms/water/water.component';


const routes: Routes = [
  { path: '**', component: WaterComponent}
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { initialNavigation: false }),
  WaterRoutingModule,
  ScenarioRoutingModule,
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
