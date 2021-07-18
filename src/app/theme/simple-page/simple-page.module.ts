import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimplePageComponent } from './simple-page.component';
import {SimplePageRoutingModule} from './simple-page-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    SimplePageRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [SimplePageComponent]
})
export class SimplePageModule { }
