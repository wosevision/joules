import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'titleCase'})
export class TitleCasePipe implements PipeTransform {
  public transform(str: string): string {
    return str.split('-').map(
      (item, i) => `${i === 0 ? item.charAt(0).toUpperCase() : item.charAt(0)}${item.substring(1)}`
    ).join(' ');
  }
}
