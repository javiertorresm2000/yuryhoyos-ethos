import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CompanyDetailsRoutingModule } from './company-details-routing.module';
import { CompanyDetailsComponent } from './company-details.component';
import { QuillEditorModule } from 'ngx-quill-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    declarations: [CompanyDetailsComponent],
    imports: [
        CommonModule,
        CompanyDetailsRoutingModule,
        SharedModule,
        QuillEditorModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule
    ]
})
export class CompanyDetailsModule { }
