import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterComponent } from './water.component';


const routes: Routes = [
  { path:  'water/:id', component:  WaterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterRoutingModule { }
