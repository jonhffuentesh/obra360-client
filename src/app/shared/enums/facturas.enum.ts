export enum FacturaEstado {
    Activa = 'Activa', // Factura generada y pagada
    Pendiente = 'Pendiente', // Factura generada pero no pagada (cuando se asigna a un cliente)
    Anulada = 'Anulada' // Factura anulada por nota crédito
}

export enum TipoPago {
    Efectivo = 'Efectivo',
    Tarjeta = 'Tarjeta',
    Transferencia = 'Transferencia'
}

export enum NotaCreditoEstado {
    Activa = 'Activa',
    Anulada = 'Anulada'
}
