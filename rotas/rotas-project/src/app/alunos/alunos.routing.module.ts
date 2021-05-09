import { AlunosDeactivateGuard } from './../guards/alunos-deactivate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunosDetalheComponent } from './alunos-detalhe/alunos-detalhe.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunoNaoEncontradoComponent } from './aluno-nao-encontrado/aluno-nao-encontrado.component';

import { AlunosGuard } from './../guards/alunos.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

const alunosRoutes: Routes = [
  //OBS: Para evitar colisão com nome de rotas colocar primeiro as rotas que são 'hardcode', sem enderço dinamico com id
  //Precisamos informar à rota que estamos resolvendo o objeto Aluno antes de carregar o componente
  {
    path: '', component: AlunosComponent,
    canActivateChild: [AlunosGuard],
    children: [
      { path: 'naoEncontrado', component: AlunoNaoEncontradoComponent },
      { path: 'novo', component: AlunosFormComponent },
      {
        path: ':id', component: AlunosDetalheComponent,
        resolve: {aluno: AlunoDetalheResolver} //aluno é o parametros que vai ser passado para as inormações da rota que serão carregadas no componente AlunoDetalhe
      },
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
