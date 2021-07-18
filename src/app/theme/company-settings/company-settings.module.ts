import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsComponent } from './company-settings.component';

@NgModule({
  declarations: [CompanySettingsComponent],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class CompanySettingsModule { }
