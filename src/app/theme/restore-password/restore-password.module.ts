import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RestorePasswordRoutingModule } from './restore-password-routing.module';
import { RestorePasswordComponent } from './restore-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RestorePasswordComponent],
    imports: [
        CommonModule,
        RestorePasswordRoutingModule,
        SharedModule,
        FormsModule, 
        ReactiveFormsModule 
    ]
})
export class RestorePasswordModule { }
