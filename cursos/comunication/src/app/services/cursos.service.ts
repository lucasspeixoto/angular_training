import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: string[] = ['Angular', 'React']
  static criouNovoCurso = new EventEmitter<any>()

  constructor() { }

  getCurso() {
    return this.cursos
  }

  addCurso(curso: string) {
    this.cursos.push(curso)
    CursosService.criouNovoCurso.emit(curso)
  }






}
