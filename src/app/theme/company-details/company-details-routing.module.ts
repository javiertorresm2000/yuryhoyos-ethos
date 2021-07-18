import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailsComponent } from './company-details.component'

const routes: Routes = [
    {
        path: '',
        component: CompanyDetailsComponent,
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
export class CompanyDetailsRoutingModule { }
