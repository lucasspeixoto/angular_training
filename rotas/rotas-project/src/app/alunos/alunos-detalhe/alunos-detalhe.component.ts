
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from './../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.css']
})
export class AlunosDetalheComponent implements OnInit {

  id!: number
  inscricao!: Subscription
  aluno!: Aluno

  constructor(
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  editarAluno() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }

  /* Aqui carregamos a informação do detalhe ao iniciar o componente.
  Esses dados só carregam ao inicar o componente, porem podemos carregar
  antes, com o Guarda de rotas resolve*/
  ngOnInit(): void {


    /* Não precisa pegar o id para buscar o aluno, podemos ir direto no aluno */
    this.inscricao = this.route.data.subscribe(
      //(info: {aluno: Aluno}) => this.aluno = info.aluno //Esse info.aluno o aluno do resolve: {aluno: AlunoDetalheResolver}
      (info) => this.aluno = info.aluno
    )

    /* Trecho sem o resolver
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id']
        this.aluno = this.alunosService.getAluno(this.id)

        if (this.aluno == null) {
          //Redireciona a rota
          this.aluno = {}
          this.router.navigate(['/alunos/naoEncontrado'])
        }
      }
    ) */
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe()
  }
}
