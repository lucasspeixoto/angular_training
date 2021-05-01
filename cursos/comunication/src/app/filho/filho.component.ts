import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CursosService } from '.././services/cursos.service'

@Component({
  selector: 'app-filho',
  templateUrl: './filho.component.html',
  styleUrls: ['./filho.component.css']
})
export class FilhoComponent implements OnInit {

  @Input('cursos') cursos: string[] = []
  @Output('adicionouCurso') adicionouCurso = new EventEmitter<string>()

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
  }

  onAddCurso(curso: string) {
    this.cursosService.addCurso(curso)
    this.adicionouCurso.emit('Adicionei')
  }


}
