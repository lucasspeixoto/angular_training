import { Component, OnInit } from '@angular/core';

import { CursosService } from './../services/cursos.service';
@Component({
  selector: 'app-pai',
  templateUrl: './pai.component.html',
  styleUrls: ['./pai.component.css']
})
export class PaiComponent implements OnInit {

  cursos: string[] = []

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCurso()
  }

  onAddCurso(curso: string) {
    this.cursosService.addCurso(curso)
  }

  adicionouNoFilho(event: any) {
    console.log(`Mensagem do Filho: ${event}`)
  }

}
