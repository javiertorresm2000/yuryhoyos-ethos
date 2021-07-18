import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { SharedModule } from '../../shared/shared.module';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CompaniesComponent],
    imports: [
        SharedModule,
        NgxDatatableModule,
        CommonModule,
        CompaniesRoutingModule,
        UiSwitchModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CompaniesModule { }
