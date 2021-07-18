import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CompanyUsersRoutingModule } from './company-users-routing.module';
import { CompanyUsersComponent } from './company-users.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CompanyUsersComponent],
  imports: [
    SharedModule,
    NgxDatatableModule,
    CommonModule,
    CompanyUsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompanyUsersModule { }
