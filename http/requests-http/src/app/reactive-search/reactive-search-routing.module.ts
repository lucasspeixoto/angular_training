import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibSearchComponent } from './lib-search/lib-search.component';

const ReactiveSearchRoutes: Routes = [
  {
    path: '',
    component: LibSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ReactiveSearchRoutes)],
  exports: [RouterModule]
})
export class ReactiveSearchRoutingModule { }
