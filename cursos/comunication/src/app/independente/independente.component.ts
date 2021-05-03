import { Component, OnInit } from '@angular/core';

import { CursosService } from './../services/cursos.service';
@Component({
  selector: 'app-independente',
  templateUrl: './independente.component.html',
  styleUrls: ['./independente.component.css'],
  providers: [CursosService]
})
export class IndependenteComponent implements OnInit {

  cursos: string[] = []

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCurso()
    CursosService.criouNovoCurso.subscribe(
      cursoAdd => this.cursos.push(cursoAdd)
    )
  }

}
