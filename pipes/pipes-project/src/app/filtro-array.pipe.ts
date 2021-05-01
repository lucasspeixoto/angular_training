import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'

})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if (value.length === 0 || args === undefined) {
      return value
    }
    const filter = args.toLocaleString().toLocaleLowerCase();
    return value.filter(
      (v: string) => v.toLocaleLowerCase().includes(filter)
    )
  }

}
