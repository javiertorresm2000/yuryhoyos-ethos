import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestorePasswordComponent } from './restore-password.component';

const routes: Routes = [
    {
        path: '',
        component: RestorePasswordComponent,
        data: {
            title: 'Coming Soon'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestorePasswordRoutingModule { }
