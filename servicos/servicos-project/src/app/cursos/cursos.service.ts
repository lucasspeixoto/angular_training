import { Injectable, EventEmitter } from '@angular/core';

import { LogService } from '../shared/log.service'

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  emitirCursoCriado = new EventEmitter<any>()      //Acessível via instância
  static criouNovoCurso = new EventEmitter<any>()  //Acessível via método
  /*Por ser estátiva a variável criouNovoCurso vai ser
  compartilhado entre as instâncias */
  /* Ao declarar um atributo ou método de uma classe como
  estático, não é necessário a instância da classe para acessar o mesmo*/
  /*Quando as duas instâncias do CurSosService forem criadas
  a variável criouNovoCurso vai ser compartilhada.*/
  private cursos: any[] = [
    {'name': 'Angular', 'qnt': 145},
    {'name': 'Python', 'qnt': 242},
    {'name': 'Cobol', 'qnt': 52},
    {'name': 'Fortran', 'qnt': 15}
  ]

  constructor(
    private logService: LogService
  ) {
    console.log('Instanciando CursosService')
  }
  getCursos() {
    this.logService.consoleLog('Obtendo Lista de cursos')
    return this.cursos
  }

  AddCurso(curso: string, qnt: string) {
    this.logService.consoleLog(`Adicionando o curso '${curso}' com ${qnt} vagas.`)
    this.cursos.push({'name': curso, 'qnt': qnt})

    //Sempre que esse método for chamado
    this.emitirCursoCriado.emit(curso)
    CursosService.criouNovoCurso.emit([curso, qnt])
  }

}
