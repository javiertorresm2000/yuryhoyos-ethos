import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule
    ]
})
export class ProfileModule { }
