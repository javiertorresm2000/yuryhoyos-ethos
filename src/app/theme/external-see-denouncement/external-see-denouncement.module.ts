import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ExternalSeeDenouncementRoutingModule } from './external-see-denouncement-routing.module';
import { ExternalSeeDenouncementComponent } from './external-see-denouncement.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    declarations: [ExternalSeeDenouncementComponent],
    imports: [
        CommonModule,
        ExternalSeeDenouncementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        SharedModule,
        FileUploadModule,
        NgxDatatableModule
    ]
})
export class ExternalSeeDenouncementModule { }
