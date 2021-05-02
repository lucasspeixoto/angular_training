import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id: string = ''
  inscricao!: Subscription

  constructor(
    private route: ActivatedRoute
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
      }
    )
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe()

  }

}
