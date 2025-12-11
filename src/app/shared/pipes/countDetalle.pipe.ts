import { Pipe, PipeTransform } from '@angular/core';
import { DetallePedido } from 'src/app/modules/pedidos/interfaces/detalle-predido.interface';

@Pipe({
    name: 'countDetalle',
    standalone: true,
})
export class CountDetallePipe implements PipeTransform {
    transform(value: DetallePedido[], args?: any): any {
        if (value) {
            return value.reduce((acc, curr) => acc + curr.cantidad, 0);
        }
        return null;
    }
}
