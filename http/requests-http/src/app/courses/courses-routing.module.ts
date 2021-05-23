import { CoursesListComponent } from './courses-list/courses-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const CoursesRoutes: Routes = [
  { path: '', component: CoursesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(CoursesRoutes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
