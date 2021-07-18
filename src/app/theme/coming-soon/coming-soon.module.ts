import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonRoutingModule } from './coming-soon-routing.module';
import { ComingSoonComponent } from './coming-soon.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxCarouselModule } from 'ngx-carousel';

@NgModule({
    imports: [
        CommonModule,
        ComingSoonRoutingModule,
        SharedModule,
        FormsModule,
        NgxCarouselModule
    ],
    declarations: [ComingSoonComponent]
})
export class ComingSoonModule { }
