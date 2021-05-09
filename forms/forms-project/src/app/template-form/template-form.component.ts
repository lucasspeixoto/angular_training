import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  @ViewChild('f') valorInputForm!: HTMLElement

  constructor() { }

  ngOnInit(): void {
  }

  //Acessando com a variável f
  onSubmit(form: any) {
    console.log(form)
    console.log(form.value.nome)
    console.log(form.value.email)
  }

  //Acessando com ViewChild
  /* onSubmit() {
    console.log(this.valorInputForm)
  } */

}
