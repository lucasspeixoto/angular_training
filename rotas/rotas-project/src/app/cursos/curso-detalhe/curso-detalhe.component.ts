import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from '../cursos.service';
@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id!: number
  inscricao!: Subscription
  curso: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {
    //Essa forma só captura o id quando o componente é renderizado pela 1ª vez.
    //this.id = this.route.snapshot.params['id']
    /*console.log(this.route) /* O params é uma classe BehaviourSubject, ou seja,
    podemos nos inscrever e ficar escutando as mudanças */
  }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id']
        this.curso = this.cursosService.getCurso(this.id)

        if (this.curso == null) {
          //Redireciona a rota
          this.router.navigate(['cursos/naoEncontrado'])
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe()

  }

}
