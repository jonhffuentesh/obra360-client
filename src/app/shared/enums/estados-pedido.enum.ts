export enum EstadosPedido {
    pendiente = 'pendiente',
    entregaParcial = 'entrega parcial',
    realizado = 'realizado',
}

export const EstadosPedidos = [
    {
        nombre: EstadosPedido.pendiente,
        value: EstadosPedido.pendiente,
    },
    {
        nombre: EstadosPedido.entregaParcial,
        value: EstadosPedido.entregaParcial,
    },
    {
        nombre: EstadosPedido.realizado,
        value: EstadosPedido.realizado,
    },
];
