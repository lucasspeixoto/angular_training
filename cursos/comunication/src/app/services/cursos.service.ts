import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: string[] = ['Angular', 'React']

  static adicionouCurso = new EventEmitter<any>()

  constructor() {
    console.log('Instanciando CursosService')
   }

  getCursos() {
    return this.cursos
  }

  AddCursos(curso: string) {
    this.cursos.push(curso)
    CursosService.adicionouCurso.emit(curso)
  }
}
