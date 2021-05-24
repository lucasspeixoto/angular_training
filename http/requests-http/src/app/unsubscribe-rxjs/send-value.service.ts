import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendValueService {

  private emissor$ = new Subject<string>(); //Criação de um observable

  emitirValor(valor: string) {
    this.emissor$.next(valor);
  }

  getValor() {
    return this.emissor$.asObservable();
  }

}
