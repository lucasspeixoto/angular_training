import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Aluno } from '../aluno';
import { AlunosService } from '../alunos.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoDetalheResolver implements Resolve<Aluno> {
  //Aluno é o tipo do objeto que será 'resolvido' A classe resolver vai tentar carregar um objeto do tipo aluno

  constructor(
    private alunosService: AlunosService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    //Lógica para carregar id
    let id = route.params['id']

    return this.alunosService.getAluno(id)
  }
}
