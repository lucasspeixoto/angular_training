import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  @ViewChild('f') valorInputForm!: HTMLElement

  usuario: any = {
    nome: null,
    email: null,
    cep: null,
    numero: null,
    complemento: null,
    rua: null,
    bairro: null,
    cidade: null,
    estado: null
  }

  constructor(
    //private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  /* ngAfterContentChecked() {
    this.cdref.detectChanges();
  } */

  //Acessando com a variável f
  onSubmit(form: any) {
    console.log(form)
  }

  //Acessando com ViewChild
  /* onSubmit() {
    console.log(this.valorInputForm)
  } */

}
