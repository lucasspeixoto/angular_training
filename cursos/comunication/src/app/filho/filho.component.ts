import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CursosService } from './../services/cursos.service';

@Component({
  selector: 'app-filho',
  templateUrl: './filho.component.html',
  styleUrls: ['./filho.component.css']
})
export class FilhoComponent implements OnInit {

  @Input ('cursos') cursos: string[] = []
  @Output('adicionouCurso') adicionouCurso = new EventEmitter<any>()

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {

  }

  onAddCurso(curso: string){
    this.cursosService.AddCursos(curso)
    this.adicionouCurso.emit('Adicionei Pai')
  }

}
