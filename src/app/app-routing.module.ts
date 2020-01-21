import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterRoutingModule } from './forms/water/water-routing.module';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  WaterRoutingModule,
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
