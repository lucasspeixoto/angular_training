import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';


@NgModule({
  declarations: [
    AlertModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent
  ],
  entryComponents: [AlertModalComponent] /*Nas versões anteriores, era necessário o 
  colocar o AlertModalComponente no entryComponents, pois é um componente instanciado em
  tempo de execução, ou seja, não sera usado em um template nem em roteamente  */
})
export class SharedModule { }
