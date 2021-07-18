import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalCompanyComponent } from './external-company.component';

const routes: Routes = [
    {
        path: '',
        component: ExternalCompanyComponent
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalCompanyRoutingModule { }
