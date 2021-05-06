import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  //Lazy Load
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path:'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule)
  },

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], //
  exports: [RouterModule]
})
export class AppRoutingModule { }











