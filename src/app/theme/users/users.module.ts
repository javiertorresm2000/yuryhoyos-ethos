import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ng2-ui-switch';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedModule,
    NgxDatatableModule,
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
  ]
})
export class UsersModule { }
