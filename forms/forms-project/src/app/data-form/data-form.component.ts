import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/form-validations';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup
  //estados: EstadoBr[]
  estados: Observable<EstadoBr[]>
  cargos: any[]
  tecs: any[]
  newsletterOp: any[]
  frameworks = ['Angular', 'Next Js', 'React JS', 'Vue', 'Sencha']

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {

  }

  ngOnInit(): void {

    //A requisição só ocorre de colocarmos o subscribe
    //this.verificaEmailService.verificarEmail('email@email.com').subscribe()

    //Com o pipe async na nossa tag option, o subscrible e unsubscrible vai ser feito automaticamente.

    /* sem o pipe async
    this.dropdownService.getEstadosBr()
      .subscribe(ufs => { this.estados = ufs; console.log(ufs) }
      ) */

    this.estados = this.dropdownService.getEstadosBr()
    this.cargos = this.dropdownService.getCargos()
    this.tecs = this.dropdownService.getTecs()
    this.newsletterOp = this.dropdownService.getNewsletter()


    /* this.formulario = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl('')
    }) */

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]], //Inserir o bind ou passar o serviço como parâmetro
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),

      cargo: [null],
      tecs: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')], //pattern valida um expressão regular
      frameworks: this.buildFrameworks()

    })

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
          : EMPTY
        )
      )
      .subscribe(dados => dados ? this.setForm(dados) : {});


  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values)//FormValidations.requiredMinCheckbox(1))
  }

  resetar() {
    this.resetForm()
    //this.formulario.reset()
  }

  onSubmit() {

    let valueSubmit = Object.assign({}, this.formulario.value)
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    })
    console.log(valueSubmit);
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
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

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid &&
      (this.formulario.get(campo)?.touched)
    )
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo)?.hasError('required') &&
      (this.formulario.get(campo)?.touched)
    )
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
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' }
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ?
      (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel)
      : obj1 === obj2
  }

  setarTecs() {
    this.formulario.get('tecs')?.setValue(['python', 'django'])
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ?
      (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null))
  }

  /* Se nossa variável a ser exibida nas options de uma select
  for string, number, etc... pode mandar o [value], caso seja um objeto,
  o mais aconselhavel é utilizar o [ngValue] e implemente uma função compareWith
  para que o Angular saiba comparar os valores */
}
