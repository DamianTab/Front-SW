import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { DbPageFetchService } from '../../services/db-page/db-page-fetch.service';
import { DbPageIterator } from '../../services/db-page/db-page-iterator.service';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
  ],
  providers: [
    DbPageFetchService,
    DbPageIterator
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
