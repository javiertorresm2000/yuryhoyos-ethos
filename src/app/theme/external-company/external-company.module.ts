import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalCompanyRoutingModule } from './external-company-routing.module';
import { ExternalCompanyComponent } from './external-company.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    declarations: [ExternalCompanyComponent],
    imports: [
        CommonModule,
        ExternalCompanyRoutingModule,
        SharedModule,
        FormsModule,
        ArchwizardModule,
        FileUploadModule,
        ReactiveFormsModule,
    ]
})
export class ExternalCompanyModule { }
