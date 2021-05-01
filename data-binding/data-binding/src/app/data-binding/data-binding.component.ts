import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'https//loiane.training'
  cursoAngular: boolean = true;
  urlImage: string = 'https://loremflickr.com/320/240'

  valorInput: string = ''
  valorSalvo: any = ''

  isMouseOver: boolean = false

  nome1: any = 'abc'
  nome2: any = 'abc'
  nome3: any = 'abc'

  pessoa: any = {
    nome: 'Liana',
    idade: 27,

  }
  printInput1(evento: any) {
    console.log(evento)
  }
  printInput2(evento: any) {
    console.log(evento)
  }
  printInput3(evento: any) {
    console.log(evento)
  }
  getValor() {
    return 3
  }

  getCurtirCurso() {
    return true
  }

  clicked() {
    alert('Botao clicado')
  }

  onKeyUp(evento: KeyboardEvent) {
    console.log((<HTMLInputElement>evento.target).value) /*Como evento.target é um HTMLInputElement, precisamos
     tipar para evitar erro de compilação */
    this.valorInput = (<HTMLInputElement>evento.target).value
  }

  salvarValor(valor: any) {
    this.valorSalvo = valor
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver
  }

  constructor() { }

  ngOnInit(): void {
  }

}
