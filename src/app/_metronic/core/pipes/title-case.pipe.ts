// Angular
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns only first letter of string
 */
@Pipe({
  name: 'titlecase',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string,): any {
    if (!value) return value;
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  }
}