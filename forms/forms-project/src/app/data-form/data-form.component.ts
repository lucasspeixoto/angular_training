import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    /* this.formulario = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl('')
    }) */

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  resetar() {
    this.formulario.reset()
  }

  onSubmit() {
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(
        data => {
          //Resetar form
          this.resetar()
        },
      (erro: any) => alert('Erro ao Enviar. Verificar Informações')
         )
  }

  verificaValidTouched(campo: any) {
    return !this.formulario.controls[campo].valid &&
    this.formulario.controls[campo].touched
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }

  }


}
