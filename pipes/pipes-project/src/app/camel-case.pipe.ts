import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: string): string {
    let values = value.split(' ')
    let result = ''

    result = values.map(
      item => item.replace(item[0], item[0].toUpperCase()))
        .join(' ')

    return result;

  }

}
