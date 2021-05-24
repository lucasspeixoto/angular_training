import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from '../courses/courses-list/courses-list.component';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';

const routes: Routes = [
  {
    path: '', component: CoursesListComponent
  },
  {
    path: 'rxjs-poc', component: UnsubscribePocComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnsubscribeRxjsRoutingModule { }
