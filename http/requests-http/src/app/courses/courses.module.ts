import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintErrorComponent } from './courses-form/print-error/print-error.component';
import { CrudOperationComponent } from './crud-operation/crud-operation.component';


@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesFormComponent,
    PrintErrorComponent,
    CrudOperationComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
