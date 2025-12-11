import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TipoPedido } from 'src/app/modules/pedidos/interfaces/tipo-pedido.interface';

@Component({
    selector: 'app-tipo-orden',
    templateUrl: './tipo-orden.component.html',
    styleUrls: ['./tipo-orden.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class TipoOrdenComponent implements OnInit {
    @Input({
        required: true,
    })
    tipoPedido: TipoPedido;
    constructor() {}

    ngOnInit() {}
}
