import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CursosService } from '../services/cursos.service'

@Component({
  selector: 'app-filho',
  templateUrl: './filho.component.html',
  styleUrls: ['./filho.component.css']
})
export class FilhoComponent implements OnInit {

  @Input('cursos') cursos: string[]
  @Output('adicionouCurso') adicionouCurso = new EventEmitter<any>()

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    //this.cursos = this.cursosService.getCursos()
  }

  onAddCurso(curso: string) {
    this.cursosService.AddCurso(curso)
    this.adicionouCurso.emit('Adicionei Pai')
  }

}
