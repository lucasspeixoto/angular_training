import { Component, OnInit, ViewChild } from '@angular/core';
import { OperacaoService } from './operacao.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  x: number = 0
  y: number = 0
  resultado!: number | 0
  @ViewChild('selectInput') selectedOpe!: HTMLElement

  constructor(
    private operacaoService: OperacaoService
  ) { }

  ngOnInit(): void {
    console.log(this.selectedOpe)
  }

  operacao(input: string) {
    console.log(this.selectedOpe)
    //Somar
    this.resultado = this.operacaoService.operacao(this.x, this.y, input)
  }

}
