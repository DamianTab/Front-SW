import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotExistingPageModule} from './not-existing-page/not-existing-page.module';


const routes: Routes = [
  { path: '404', component: NotExistingPageModule },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
