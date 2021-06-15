import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { PrintErrorComponent } from './generic-form/print-error/print-error.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    GenericFormComponent,
    PrintErrorComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
