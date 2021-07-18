import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxCarouselModule } from 'ngx-carousel';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        NgxCarouselModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
