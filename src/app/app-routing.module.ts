import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotExistingPageComponent} from './forms/not-existing-page/not-existing-page.component';
import { LoginComponent } from './forms/login/login.component';
import { NotExistingPageModule } from './forms/not-existing-page/not-existing-page.module';
import { LoginModule } from './forms/login/login.module';
import { NoConnectionComponent } from './forms/no-connection/no-connection.component';
import { NoConnectionModule } from './forms/no-connection/no-connection.module';
import { AuthGuard } from './shared/services/authguard/auth.guard';
import { HomeComponent } from './forms/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotExistingPageComponent},
  { path: 'disconnected', component: NoConnectionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes),
],
  exports: [RouterModule, NotExistingPageModule, LoginModule, NoConnectionModule]
})
export class AppRoutingModule { }
