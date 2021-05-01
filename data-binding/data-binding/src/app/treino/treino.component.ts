import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.component.html',
  styleUrls: ['./treino.component.css']
})
export class TreinoComponent implements OnInit {

  people: any = {
    name: 'Lucas',
    age: 22
  }

  soma: any = 0

  x: any = 0
  y: any = 0
  somaxy: any = 0

  /*Propriedade que vamos passar do componente treino para
  o componente input-property */
  nomeDoCurso: string = 'Curso de Angular 10'

  /*Propriedade que vamos passar do componente treino para
  o componente output-property */
  valorInicial: number = 15

  salvarInput1(value: any): void {
    alert(`Valor 1 igual a ${value}`)
  }

  salvarInput2(value: any): void {
    alert(`Valor 2 igual a ${value}`)
  }

  somar(x: any, y: any) {
    this.soma = parseInt(x) + parseInt(y)
  }

  checksomaxy() {
    this.somaxy = this.x + this.y
  }

  onMudouValor(event: any) {
    console.log(event.novoValor)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
