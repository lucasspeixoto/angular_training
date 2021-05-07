import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado: boolean = false
  mostrarMenuEmitter = new EventEmitter<boolean>() //Evento que vai informar ao home que não precisamos mostrar menu na tela de login

  constructor(
    private router: Router
  ) { }

  Login(usuario: Usuario) {
    if(usuario.nome === 'lucas@email.com' &&
      usuario.senha === '123') {
        this.usuarioAutenticado = true
        this.mostrarMenuEmitter.emit(true) //Se autenticado, mostrar menu
        this.router.navigate(['/'])
      } else {
        this.usuarioAutenticado = false
        this.mostrarMenuEmitter.emit(false) //Se não autenticado, não mostrar menu
        Swal.fire('Usuário ou senha incorreto');
      }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado
  }
}
