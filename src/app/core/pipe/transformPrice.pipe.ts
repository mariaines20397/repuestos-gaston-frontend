import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
@Injectable({ providedIn: 'root' })
export class PriceFormatPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Convertir el valor a string y eliminar cualquier punto existente
    let stringValue = value.toString().replace(/\./g, '');

    // Agregar puntos cada tres dígitos desde atrás
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
