import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CompanyDashboardRoutingModule } from './company-dashboard-routing.module';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [CompanyDashboardComponent],
  imports: [
    CommonModule,
    CompanyDashboardRoutingModule,
    SharedModule,
    PipesModule
  ]
})
export class CompanyDashboardModule { }
