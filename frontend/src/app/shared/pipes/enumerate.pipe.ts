import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumerate'
})
export class EnumeratePipe implements PipeTransform {

  transform(n: number): unknown {
    return new Array(n).fill(NaN);
  }

}
