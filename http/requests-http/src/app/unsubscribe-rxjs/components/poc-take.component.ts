import { SendValueService } from './../send-value.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit, OnDestroy {

  nome = 'Componente com take';
  valor: string;

  constructor(private service: SendValueService) {}

  /* Requisições http simples, onde apenas queremos obter dados do servidor,
  ou seja, em chamadas http onde o backend não é reativo */
  ngOnInit() {
    this.service.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        take(1)
      )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruido`);
  }
}
