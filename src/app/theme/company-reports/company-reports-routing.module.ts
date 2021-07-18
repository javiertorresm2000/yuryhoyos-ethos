import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyReportsComponent } from './company-reports.component';

const routes: Routes = [
    {
        path: '',
        component: CompanyReportsComponent,
        data: {
            title: 'Sample Page',
            icon: 'icon-layout-sidebar-left',
            caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
            status: false
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyReportsRoutingModule { }
