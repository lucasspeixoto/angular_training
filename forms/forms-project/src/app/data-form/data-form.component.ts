import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup
  //estados: EstadoBr[]
  estados: Observable<EstadoBr[]>
  cargos: any[]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    this.estados = this.dropdownService.getEstadosBr()
    //Com o pipe async na nossa tag option, o subscrible e unsubscrible vai ser feito automaticamente.

    /* sem o pipe async
    this.dropdownService.getEstadosBr()
      .subscribe(ufs => { this.estados = ufs; console.log(ufs) }
      ) */

    this.cargos = this.dropdownService.getCargos()

    console.log(this.estados)

    /* this.formulario = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl('')
    }) */

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      }),

      cargo: [null]

    })
  }



  resetar() {
    this.resetForm()
    //this.formulario.reset()
  }

  onSubmit() {

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify({}))
        .subscribe(
          _ => {
            //Resetar form
            this.resetForm()
          },
          (_: any) => alert('Erro ao Enviar. Verificar Informações')
        )

    } else {
      this.verificaValidacoesForm(this.formulario)

    }

  }

  verificaValidacoesForm(formGroup: FormGroup) {
    console.log('Formulário Inválido')
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo)
      control?.markAsTouched()
      if (control instanceof FormGroup) {
        this.verificaValidacoesForm(control)
      }

    })
  }

  verificaValidTouched(campo: any) {
    return !this.formulario.get(campo)?.valid &&
      this.formulario.get(campo)?.touched
  }

  verificaEmailInvalido() {
    let campo = this.formulario.controls['email']
    if (campo.errors) {
      return campo.errors['email'] && campo.touched
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }

  }

  /* Sem Service
    consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '')
    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      this.resetForm()

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(data => this.setForm(data))
      } else {
        //cep é inválido.
        this.resetForm()
        alert("Formato de CEP inválido.");
      }
    }
  } */

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.setForm(dados));
    }
  }

  setForm(data: any) {

    this.formulario.patchValue({
      endereco: {
        /* cep: data.cep, */
        rua: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }
    })

    //this.formulario.get('nome')?.setValue('Teste')
  }

  resetForm() {
    this.formulario.patchValue({
      endereco: {
        /* cep: null, */
        rua: null,
        numero: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

  setarCargo() {
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'}
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ?
    (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel)
    : obj1 === obj2
  }

  /* Se nossa variável a ser exibida nas options de uma select
  for string, number, etc... pode mandar o [value], caso seja um objeto,
  o mais aconselhavel é utilizar o [ngValue] e implemente uma função compareWith
  para que o Angular saiba comparar os valores */
}
