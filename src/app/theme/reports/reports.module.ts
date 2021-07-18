import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectModule } from 'ng-select';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    SelectModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class ReportsModule { }
