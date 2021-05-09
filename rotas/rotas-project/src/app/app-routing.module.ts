import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { PagNotFoundComponent } from './pag-not-found/pag-not-found.component';
//import { AlunosGuard } from './guards/alunos.guard';

const appRoutes: Routes = [

  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
    canActivate: [AuthGuard],
    //canActivateChild: [AlunosGuard],
    canLoad: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },

  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },

  {
    path: '**', component: PagNotFoundComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})], //
  exports: [RouterModule]
})
export class AppRoutingModule { }











