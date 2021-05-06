import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticaco: boolean = false
  mostrarMenuEmitter = new EventEmitter<boolean>() //Evento que vai informar ao home que não precisamos mostrar menu na tela de login

  constructor(
    private router: Router
  ) { }

  Login(usuario: Usuario) {
    if(usuario.nome === 'lucas@email.com' &&
      usuario.senha === '123') {
        this.usuarioAutenticaco = true
        this.mostrarMenuEmitter.emit(true) //Se autenticado, mostrar menu
        this.router.navigate(['/'])
      } else {
        this.usuarioAutenticaco = false
        this.mostrarMenuEmitter.emit(false) //Se não autenticado, não mostrar menu
      }
  }
}
