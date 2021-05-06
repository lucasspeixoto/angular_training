import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

const cursosRoutes: Routes = [
  //Para usar lazyLoading precisamos substituir 'cursos' por ''
  { path: '', component: CursosComponent },
  { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
  { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
  //Como esse modulo de rotas é de funcionalidade, utilizamos o forChild ao inves de forRoot
  imports: [RouterModule.forChild(cursosRoutes)], //
  exports: [RouterModule]
})
export class CursosRoutingModule { }











