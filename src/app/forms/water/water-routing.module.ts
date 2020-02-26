import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterComponent } from './water.component';
import {AuthGuard} from '../../shared/services/authguard/auth.guard';


const routes: Routes = [
  { path:  'container-water/:id', component:  WaterComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterRoutingModule { }
