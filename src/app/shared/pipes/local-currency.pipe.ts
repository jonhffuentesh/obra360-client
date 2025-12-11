import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localCurrency'
})
export class LocalCurrencyPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) {
      return '';
    }
    // Formato: $ 1.234.567,89
    return '$ ' + num.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
} 