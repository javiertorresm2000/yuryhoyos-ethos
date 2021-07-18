import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule,
        ChartModule
    ]
})
export class DashboardModule { }
