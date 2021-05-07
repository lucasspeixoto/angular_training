import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /* CanActivate é uma interface, onde apenas definimos o
  comportamente que a classe que for implementar a interface vai ter
  Ele possui a assinatura do método, que precisa ser implementado na
  classe */

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  //Retorna um observable ou uma promise
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.usuarioEstaAutenticado()) {
      return true
    } else {
      this.router.navigate(['/login'])

      return false
    }



  }
}
