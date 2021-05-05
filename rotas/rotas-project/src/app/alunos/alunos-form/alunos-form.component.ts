import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from './../alunos.service';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.css']
})
export class AlunosFormComponent implements OnInit {

  id!: number
  inscricao!: Subscription
  aluno: any

  constructor(
    private alunosService: AlunosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id']
        this.aluno = this.alunosService.getAluno(this.id)

        if (this.aluno == null) {
          this.aluno = {}
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe()
  }

}
