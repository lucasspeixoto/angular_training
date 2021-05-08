import { IFormCanDeactivate } from './../../guards/form-candeactivate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from './../alunos.service';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.css']
})
export class AlunosFormComponent implements OnInit, IFormCanDeactivate {

  id!: number
  inscricao!: Subscription
  aluno: any

  formMudou: boolean = false

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

  onInput() {
    this.formMudou = true
    console.log('Form Mudou')
  }

  podeMudarRota() {
    if (this.formMudou) {
      confirm('Modificações foram feitas. Deseja sair ?')
    }
    return true
  }

  podeDesativar() {
    return this.podeMudarRota()
  }


}
