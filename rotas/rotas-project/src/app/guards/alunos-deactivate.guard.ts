import { IFormCanDeactivate } from './form-candeactivate';
import { AlunosFormComponent } from './../alunos/alunos-form/alunos-form.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

  canDeactivate(
    component: IFormCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return component.podeDesativar()   //Se o form mudou não desativa a rota
  }

}

/*  Sem o uso da interface, ou seja, apenas para o componente AlunosFormComponent
export class AlunosDeactivateGuard implements CanDeactivate<AlunosFormComponent> {

  canDeactivate(
    component: AlunosFormComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return component.podeMudarRota() //Se o form mudou não desativa a rota
  }

}
*/
