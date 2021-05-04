import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: any[] = [
    { id: 1, nome: 'Angular' },
    { id: 2, nome: 'React' },
    { id: 3, nome: 'Vue' },
    { id: 4, nome: 'Next' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  getCursos() {
    return this.cursos
  }

 /*  getCurso(_id: number) {
    let cursos = this.getCursos()
    for (let i = 0; i <= cursos.length; i++) {
      let curso = cursos[i]
      if (curso.id == _id) {
        return curso
      } else {
        return null
      }
    }
  } */

  /* OU..... ---> */
  getCurso(_id: number) {
    return this.getCursos().find(curso => curso.id == _id) || null
  }

}



