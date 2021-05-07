
import { AuthService } from "../login/auth.service";

import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(route)
    console.log(state)
    if (state.url.includes('editar')) {
      this.router.navigate(['/alunos'])
      alert('Você não pode editar as notas')
      return false
    }

    return true;

  }

  /* Se quisermos uma guarda somente para componentes filhos, sem passar a verificação
  no componente pai, podemos definir a rota dentro do routing daquele componente ao
  inves de definir no app-routing.module.ts */

}
