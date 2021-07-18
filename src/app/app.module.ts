import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { ToastyModule } from 'ng2-toasty';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { ExternalComponent } from './layout/external/external.component';

import { RouterModule, Routes, ExtraOptions } from '@angular/router';

const routerOptions: ExtraOptions = {
    anchorScrolling: "enabled",
    scrollPositionRestoration: 'enabled'
}

const routes = []

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        AuthComponent,
        BreadcrumbsComponent,
        ExternalComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot(routes, routerOptions)
    ],
    providers: [MenuItems, AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
