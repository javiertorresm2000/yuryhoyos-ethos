import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';


const routes: Routes = [
    {
      path: '',
      component: LogoutComponent,
      data: {
        title: 'Coming Soon'
      }
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutRoutingModule { }
