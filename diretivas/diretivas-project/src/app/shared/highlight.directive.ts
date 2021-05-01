import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor
  }

  @HostBinding('style.backgroundColor') get setColor() {
    //Código extra
    return this.backgroundColor
  }
  private backgroundColor!: string

  @Input('defaultColor') defaultColor: string = 'white'
  @Input('highlightColor') highlightColor: string = 'yellow'

  constructor() { }

  //Diretivas são componentes sem template
  ngOnInit() {
    this.backgroundColor = this.defaultColor
  }

}
