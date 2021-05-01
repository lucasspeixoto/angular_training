import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CursosService]
})
export class CursosComponent implements OnInit {

  //cursos: any[] = []
  cursos!: any[]
  qnt!: any[]

  constructor(
    private cursosService: CursosService
  ) { }
    /* Aqui instanciamos manualmente o serviço, porém, o ideal é a injeção de dependência
    Ja que poderimos ter que passar muitos parâmetros para as diversas variáveis que poderiam
    existir no serviço */
    //this.cursosService = new CursosService()
    /* A injeção de dependência cria a instância automaticamente */


  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();

    //Inscrição no evento emitido no service (emitirCursoCriado)
    CursosService.criouNovoCurso.subscribe(
      //cursoAdd - Enviado via EventEmitter
      cursoAdd => this.cursos.push({ 'name': cursoAdd[0], 'qnt': cursoAdd[1]})
    )

  }

}
