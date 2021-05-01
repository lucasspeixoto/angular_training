import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
})
export class OutputPropertyComponent implements OnInit {

  @Input() valor: number = 0;
  @Output() mudouValor = new EventEmitter()
  /*mudouValor vai ser a variável que vamos usar para emitir um evento
  do componente filho (OutputPropertyComponent) para o componente Pai (TreinoComponente)*/

  @ViewChild('campoInput', {static: false}) campoValorInput!: ElementRef
  /*Com ViewChild temos acesso direto ao elemento html, podendo
  acessar todas as suas propriedades dentro do nativeElementas
  propriedades do elemento */

  incrementa() {
    //console.log(this.campoValorInput.nativeElement.value)
    this.campoValorInput.nativeElement.value++
    this.mudouValor.emit({novoValor: this.campoValorInput.nativeElement.value})
  }

  decrementa() {
    //console.log(this.campoValorInput.nativeElement.value)
    this.campoValorInput.nativeElement.value--
    this.mudouValor.emit({novoValor: this.campoValorInput.nativeElement.value})
  }

  constructor() { }

  ngOnInit(): void {
  }

}
