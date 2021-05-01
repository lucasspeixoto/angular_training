import { Pipe } from '@angular/core';

import { FiltroArrayPipe } from './filtro-array.pipe'

@Pipe({
  name: 'filtroArrayImpuro',
  pure: false
})
export class FiltroArrayImpuroPipe extends FiltroArrayPipe {

  /* Ao usar o extends, nossa classe herda a classe FiltroArrayImpuroPipe
  podendo acessar seus métodos e propriedades*/

}
