import { Directive, HostListener, HostBinding, /*ElementRef, Renderer2 */} from '@angular/core';

@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {

  //'mouseenter' é o evento que estamos escutando. onMouseOver() é a função que será chamada ao disparar o evento
  @HostListener('mouseenter') onMouseEnter() {
    // this._renderer.setStyle(
    //   this._elementRef.nativeElement,
    //   'background-color', 'yellow'
    // )
    this.backgroundColor = 'yellow'
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this._renderer.setStyle(
    //   this._elementRef.nativeElement,
    //   'background-color', 'white'
    // )
    this.backgroundColor = 'white'
  }

  // Sem manipulação: @HostBinding('style.backgroundColor') backgroundColor!: string
  @HostBinding('style.backgroundColor') get setColor() {
    //Código extra
    return this.backgroundColor
  }
  private backgroundColor!: string

  constructor(
    // private _elementRef: ElementRef,
    // private _renderer: Renderer2
  ) { }

}
