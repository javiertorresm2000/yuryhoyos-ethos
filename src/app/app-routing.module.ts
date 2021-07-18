import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ExternalComponent } from './layout/external/external.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'start',
                pathMatch: 'full'
            },
            {
                path: 'start',
                loadChildren: './theme/coming-soon/coming-soon.module#ComingSoonModule'
            },
            {
                path: 'login',
                loadChildren: './theme/login/login.module#LoginModule'
            },
            {
                path: 'auth/login/simple',
                loadChildren: './theme/logout/logout.module#LogoutModule'
            },
            {
                path: 'auth/forgot',
                loadChildren: './theme/restore-password/restore-password.module#RestorePasswordModule'
            },
        ]
    },

    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'user/profile',
                loadChildren: './theme/profile/profile.module#ProfileModule'
            },

            {
                path: 'dashboard',
                loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
            },

            //OWNER SYSTEM
            {
                path: 'users',
                loadChildren: './theme/users/users.module#UsersModule'
            },
            {
                path: 'config',
                loadChildren: './theme/config/config.module#ConfigModule'
            },
            {
                path: 'reports',
                loadChildren: './theme/reports/reports.module#ReportsModule'
            },
            {
                path: 'companies',
                loadChildren: './theme/companies/companies.module#CompaniesModule'
            },


            //COMPANY ROUTES

            {
                path: 'company-dashboard',
                loadChildren: './theme/company-dashboard/company-dashboard.module#CompanyDashboardModule'
            },


            {
                path: 'company-denouncement',
                loadChildren: './theme/company-denouncement/company-denouncement.module#CompanyDenouncementModule'
            },
            {
                path: 'company-reports',
                loadChildren: './theme/company-reports/company-reports.module#CompanyReportsModule'
            },
            {
                path: 'denouncement/:id',
                loadChildren: './theme/denouncement/denouncement.module#DenouncementModule'
            },

            {
                path: 'company-settings',
                loadChildren: './theme/company-settings/company-settings.module#CompanySettingsModule'
            },

            {
                path: 'company-details',
                loadChildren: './theme/company-details/company-details.module#CompanyDetailsModule'
            },

            {
                path: 'company-users',
                loadChildren: './theme/company-users/company-users.module#CompanyUsersModule'
            },



        ]
    },
    {
        path: '',
        component: ExternalComponent,
        children: [
            {
                path: ':company',
                loadChildren: './theme/external-company/external-company.module#ExternalCompanyModule'
            },
            {
                path: ':company/denouncement',
                loadChildren: './theme/external-see-denouncement/external-see-denouncement.module#ExternalSeeDenouncementModule'
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
