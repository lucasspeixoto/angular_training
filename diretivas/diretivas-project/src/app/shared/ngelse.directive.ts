import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

//TemplateRef faz referência ao próprio templateUrl
//ViewContainerRef faz referência ao conteudo que queremos renderizar (uma div)
@Directive({
  selector: '[appNgelse]'
})
export class NgelseDirective {
  //Queremos escutar esse Input toda vez que ele for setado
  //Com set. todas vez que appNgelse for modificado, set é chamado e modifica o template
  @Input() set appNgelse(condition: boolean) {
    if (!condition) {
      //createEmbeddedView - Vai renderizar a view embutida no nosso tempalte
      this._viewContainerRef.createEmbeddedView(this._templateRef)
    } else {
      this._viewContainerRef.clear()
    }
  }

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef
  ) { }

}
