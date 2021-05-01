import { Component, OnInit } from '@angular/core';

import { CursosService } from './../cursos/cursos.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css'],
  providers: [CursosService]
  /*O serviço vai ser compartilhado com os componentes filhos, no caso o recever-curso.component,
  ou sejam ambos vão receber a mesma instância do serviço */
})
export class CriarCursoComponent implements OnInit {

  cursos: any[] = []

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos()
  }

  onAddCurso(curso: string, qnt: string) {
    this.cursosService.AddCurso(curso, qnt)
  }

}
