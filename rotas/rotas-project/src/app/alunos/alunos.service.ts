import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  alunos: any[] = [
    { id: 1, nome: 'Aluno A', email: 'alunoA@email.com' },
    { id: 2, nome: 'Aluno B', email: 'alunoB@email.com' },
    { id: 3, nome: 'Aluno C', email: 'alunoC@email.com' },
    { id: 4, nome: 'Aluno D', email: 'alunoD@email.com' }
  ]

  constructor() { }

  getAlunos() {
    return this.alunos
  }

  getAluno(_id: number) {
    return this.getAlunos().find(aluno => aluno.id == _id) || null
  }
}
