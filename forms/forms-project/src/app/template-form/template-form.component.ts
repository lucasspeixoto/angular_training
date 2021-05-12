import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Form } from '@angular/forms';
import { formatCurrency, getLocaleDayPeriods } from '@angular/common';
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
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }

  }

  consultaCEP(cep: string, forms: any) {
    cep = cep.replace(/\D/g, '')
    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      this.resetForm(forms)

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(
            //data => console.log(data)
            data => this.setForm(data, forms)
          )
      }
    }
  }

  setForm(data: any, forms: any) {

    /* forms.setValue({
      nome: form.value.nome,
      email: form.value.email,
      endereco: {
        cep: data.cep,
        rua: data.logradouro,
        numero: '',
        complemento: data.complemento,
        bairro:data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }
    }) */
    //Com patchValue podemos preencher os campos que queremos a necessidade de colocar os outros campos (Como é com setValue)
    forms.form.patchValue(
      {
        endereco: {
          cep: data.cep,
          rua: data.logradouro,
          complemento: data.complemento,
          bairro:data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }
      })
  }

  resetForm(forms:any) {
    forms.form.patchValue(
      {
        endereco: {
          cep: null,
          rua: null,
          complemento: null,
          bairro:null,
          cidade: null,
          estado: null
        }
      })
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
