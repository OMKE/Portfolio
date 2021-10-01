import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit',
})
export class WordLimitPipe implements PipeTransform {
  transform(value: string, limit: number = 13): string {
    if (value.split(' ').length > limit) {
      return `${value.split(' ').slice(0, limit).join(' ')}...`;
    } else if (!value.includes(' ')) {
      return value.slice(0, 78);
    }
    return value;
  }
}
