import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';

const CoursesRoutes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'new', component: CoursesFormComponent },
  { path: 'edit/:id', component: CoursesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(CoursesRoutes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
