import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundRate'
})
export class RoundRatePipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value * 10) / 10;
  }

}
