import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css'],
  inputs: ['nomeDoCurso:nome']
})
export class InputPropertyComponent implements OnInit {

  @Input('nome') nomeDoCurso: string = '' /*Com esse decorator conseguimos expor a propriedade nome
  para o seletor (app-curso). Dentro do input passamos 'nome', que é o nome da variável que
  vamos export, que está em <app-curso [nome]="nomeDoCurso". Se o nome da variável for o mesmo
  em na passagem e na declaração (@Input('nome') nome: string = '') não é necessário passar no
  decorator. Podemos colocar o Input como metadado*/

  constructor() { }

  ngOnInit(): void {
  }

}
