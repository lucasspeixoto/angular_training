import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: string[] = ['Angular', 'React']

  static adicionouCurso = new EventEmitter<string>()

  constructor() {
  console.log('Instanciando Cursos Service')
 }

  getCursos() {
    return this.cursos
  }

  AddCurso(curso: string) {
    this.cursos.push(curso)
    CursosService.adicionouCurso.emit(curso)
  }
}
