import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ConfigComponent],
    imports: [
        CommonModule,
        ConfigRoutingModule,
        SharedModule,
        FormsModule, 
        ReactiveFormsModule 
    ]
})
export class ConfigModule { }
