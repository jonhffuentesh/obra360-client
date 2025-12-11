import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, locale: string = 'es'): string {
    if (!value) return '';
    const day = formatDate(value, 'dd', locale);
    const month = formatDate(value, 'MMMM', locale);
    const year = formatDate(value, 'yyyy', locale);
    return `${day} de ${month} del ${year}`;
  }
}
