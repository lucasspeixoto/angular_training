import { AlunosDeactivateGuard } from './../guards/alunos-deactivate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunosDetalheComponent } from './alunos-detalhe/alunos-detalhe.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunoNaoEncontradoComponent } from './aluno-nao-encontrado/aluno-nao-encontrado.component';

import { AlunosGuard } from './../guards/alunos.guard';

const alunosRoutes: Routes = [
  //OBS: Para evitar colisão com nome de rotas colocar primeiro as rotas que são 'hardcode', sem enderço dinamico com id
  {
    path: '', component: AlunosComponent,
    canActivateChild: [AlunosGuard],
    children: [
      { path: 'naoEncontrado', component: AlunoNaoEncontradoComponent },
      { path: 'novo', component: AlunosFormComponent },
      { path: ':id', component: AlunosDetalheComponent },
      {
        path: ':id/editar', component: AlunosFormComponent,
        canDeactivate: [AlunosDeactivateGuard]
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
