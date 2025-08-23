import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: false
})
export class PricePipe implements PipeTransform {
  transform(value: any): string {
    const numPrice = parseFloat(value);
    if (isNaN(numPrice)) {
      return '$0.00';
    }
    return `$${numPrice.toFixed(2)}`;
  }
}