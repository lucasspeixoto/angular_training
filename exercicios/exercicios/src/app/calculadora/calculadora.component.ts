import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selectedOption!: string

  @ViewChild("selectInput", { static: false }) selectInput!: ElementRef;

  constructor(
    private operacaoService: OperacaoService
  ) { }

  ngOnInit(): void {
  }

  onOperacao() {
    //Somar
    //console.log(this.selectInput.nativeElement.value)
    this.resultado = this.operacaoService.operacao(this.x, this.y, this.selectInput.nativeElement.value)
  }

}
