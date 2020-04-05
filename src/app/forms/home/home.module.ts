import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CardModule } from 'primeng/card';
import { FooterModule } from '../footer/footer/footer.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CardModule,
    FooterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
