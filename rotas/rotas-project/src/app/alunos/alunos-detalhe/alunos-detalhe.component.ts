import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from './../alunos.service';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.css']
})
export class AlunosDetalheComponent implements OnInit {

  id!: number
  inscricao!: Subscription
  aluno: any

  constructor(
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  editarAluno() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id']
        this.aluno = this.alunosService.getAluno(this.id)

        if (this.aluno == null) {
          //Redireciona a rota
          this.router.navigate(['/naoEncontrado'])
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe()
  }
}
