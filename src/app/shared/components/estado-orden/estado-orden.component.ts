import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { EstadosPedido } from '../../enums/estados-pedido.enum';

@Component({
    selector: 'app-estado-orden',
    templateUrl: './estado-orden.component.html',
    styleUrls: ['./estado-orden.component.css'],
    standalone: true,
    imports: [CommonModule, BadgeModule],
})
export class EstadoOrdenComponent implements OnInit {
    @Input({
        required: true,
    })
    estado!: EstadosPedido;
    estados = EstadosPedido;
    constructor() {}

    ngOnInit() {}
}
