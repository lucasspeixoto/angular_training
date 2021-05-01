import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFundoAzul]' //Caso queira aplicar a diretiva apenas a paragrafos: p[appFundoAzul]
})
export class FundoAzulDirective {


  constructor(
    private _ElementRef: ElementRef,
    private _Renderer2: Renderer2
  )
  {
    //Com ElementRef
    // this._ElementRef.nativeElement.style.backgroundColor = 'blue'
    // this._ElementRef.nativeElement.class = 'btn btn-primary'
    // this._ElementRef.nativeElement.style.color = 'white'

    //Com Renderer2
    this._Renderer2.setStyle(this._ElementRef.nativeElement, 'background-color', 'blue')
    this._Renderer2.setStyle(this._ElementRef.nativeElement, 'class', 'btn btn-primary')
    this._Renderer2.setStyle(this._ElementRef.nativeElement, 'color', 'white')
   }

}
// Acessar um elemento com ElementRef, estamos acessando um elemento diretamente
// na DOM, o que pode trazer vulnerabilidades. Para evitar isso, usamos o Renderer
