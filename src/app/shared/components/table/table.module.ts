import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimengTableModule} from 'primeng/table';
import { TableService } from '../../services/tables/table.service';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    PrimengTableModule,
    ButtonModule
  ],
  providers: [TableService],
  exports: [TableComponent]
})
export class TableModule { }
