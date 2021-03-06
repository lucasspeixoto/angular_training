import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';

const routes: Routes = [
  {
    path: 'templateForm', component: TemplateFormComponent,
    children: []
  },
  {
    path: 'dataForm', component: DataFormComponent,
    children: []
  },
  { path: '', pathMatch: 'full', redirectTo: "dataForm" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
