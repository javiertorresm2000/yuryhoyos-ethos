import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DenouncementRoutingModule } from './denouncement-routing.module';
import { DenouncementComponent } from './denouncement.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [
        DenouncementComponent
    ],
    imports: [
        SharedModule,
        NgxDatatableModule,
        CommonModule,
        DenouncementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        PipesModule
    ]
})
export class DenouncementModule { }
