import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appFontsize]'
})
export class FontsizeDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.fontSize = this.mouseenterFont
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.fontSize = this.defaultFont
    this.backgroundColor = this.defaultColor

  }

  //Binding fontSize
  @HostBinding('style.font-size') get setFont() {
    return this.fontSize
  }
  private fontSize!: string

  //Binding backgroundColor
  @HostBinding('style.backgroundColor') get setColor() {
    return this.backgroundColor
  }
  private backgroundColor!: string

  //FontSize
  @Input('defaultFont') defaultFont: string = '15px'
  @Input('mouseenterFont') mouseenterFont: string = '25px'

  //BackGroundColor
  @Input('defaultColor') defaultColor: string = 'white'
  @Input('highlightColor') highlightColor: string = 'yellow'


  constructor() { }

  ngOnInit() {
    this.fontSize = this.defaultFont
    this.backgroundColor = this.defaultColor
  }

}
