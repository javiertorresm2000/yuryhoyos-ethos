import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanySettingsComponent } from './company-settings.component'

const routes: Routes = [
    {
        path: '',
        component: CompanySettingsComponent,
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
export class CompanySettingsRoutingModule { }
