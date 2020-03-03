import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenarioComponent } from './scenario.component';
import { AuthGuard } from '../../shared/services/authguard/auth.guard';


const routes: Routes = [
  { path: 'scenario/new', component: ScenarioComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioRoutingModule { }
