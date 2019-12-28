import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PanelModule,
    BrowserAnimationsModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
