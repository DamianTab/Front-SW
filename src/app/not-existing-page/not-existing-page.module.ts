import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotExistingPageComponent} from './not-existing-page.component';


@NgModule({
  declarations: [NotExistingPageComponent],
  imports: [
    CommonModule
  ],
  exports: [NotExistingPageComponent]
})
export class NotExistingPageModule { }
