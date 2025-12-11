import { Pipe, PipeTransform } from '@angular/core';
import { ItemRecolectado } from 'src/app/modules/pedidos/interfaces/item-recolectado.interface';

@Pipe({
    name: 'recolectados',
    standalone: true,
})
export class RecolectadosPipe implements PipeTransform {
    transform(value: ItemRecolectado[], args?: 'cilindro' | 'equipo'): any {
        if (!value || !value.length) {
            return [];
        }
        console.log('🚀>>> ~ value:', value);
        if (args === 'cilindro') {
            return value.filter((i) => i.cilindro);
        }
        if (args === 'equipo') {
            return value.filter((i) => i.equipo);
        }
        return [];
    }
}
