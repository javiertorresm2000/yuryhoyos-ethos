import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalSeeDenouncementComponent } from './external-see-denouncement.component';

const routes: Routes = [
    {
        path: '',
        component: ExternalSeeDenouncementComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalSeeDenouncementRoutingModule { }
