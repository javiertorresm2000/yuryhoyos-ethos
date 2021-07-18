import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CompanyDenouncementRoutingModule } from './company-denouncement-routing.module';
import { CompanyDenouncementComponent } from './company-denouncement.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { FileUploadModule } from 'ng2-file-upload';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [
        CompanyDenouncementComponent
    ],
    imports: [
        CommonModule,
        CompanyDenouncementRoutingModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ArchwizardModule,
        FileUploadModule,
        PipesModule
    ]
})
export class CompanyDenouncementModule { }
