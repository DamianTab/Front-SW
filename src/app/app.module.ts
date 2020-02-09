import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WaterModule } from './forms/water/water.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { ScenarioModule } from './forms/scenario/scenario.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule} from './login/login.module';
import { NotExistingPageModule } from './not-existing-page/not-existing-page.module';
import { NoConnectionModule } from './no-connection/no-connection.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    WaterModule,
    NavbarModule,
    ScenarioModule,
    AppRoutingModule,
    LoginModule,
    NotExistingPageModule,
    NoConnectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
