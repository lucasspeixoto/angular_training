import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperacaoService {

  resultado!: number | 0

  constructor() { }

  soma(x: number, y: number) {
    return x + y
  }

  subtracao(x: number, y: number) {
    return x - y
  }

  multiplicacao(x: number, y: number) {
    return x * y
  }

  divisao(x: number, y: number) {
    return x / y
  }

  operacao(x: number, y: number, input: string) {
    switch (input) {
      case '1':
        this.resultado = this.soma(x, y)
        break
      case '2':
        this.resultado = this.subtracao(x, y)
        break
      case '3':
        this.resultado = this.multiplicacao(x, y)
        break
      case '4':
        this.resultado = this.divisao(x, y)
        break
    }
    return this.resultado
  }
}
