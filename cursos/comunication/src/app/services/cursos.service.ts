import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {


  private cursos: string[] = ['Angular', 'React', 'Vue']

  static criouNovoCurso = new EventEmitter<any>()

  constructor() { }

  getCursos() {
    return this.cursos
  }

  addCurso(curso: string) {
    this.cursos.push(curso)
    CursosService.criouNovoCurso.emit(curso)
  }

}
