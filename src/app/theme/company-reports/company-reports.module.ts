import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyReportsRoutingModule } from './company-reports-routing.module';
import { CompanyReportsComponent } from './company-reports.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectModule } from 'ng-select';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [CompanyReportsComponent],
    imports: [
        CommonModule,
        CompanyReportsRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        SelectModule,
        PipesModule
    ]
})
export class CompanyReportsModule { }
