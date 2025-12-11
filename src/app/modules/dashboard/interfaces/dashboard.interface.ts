export interface VentaHoy {
  totalVentas: number;
  cantidadVentas: number;
  promedioVenta: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
}

export interface FacturaHoy {
  id: number;
  serial: string;
  cliente: Cliente;
  estado: string;
  tipoOperacion: 'Credito' | 'Contado';
  total: number;
  fecha: string;
}

export interface ProductoStockBajo {
  id: number;
  nombre: string;
  stockActual: number;
  stockMin: number;
  imagenUrl: string;
}

export interface ProductoMasVendido {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: {
    id: number;
    nombre: string;
  };
  estadisticas: {
    cantidadVendida: number;
    totalVendido: number;
    promedioPrecio: number;
    vecesVendido: number;
  };
}

export interface DiaMayorVenta {
  fecha: string;
  totalVentas: number;
  cantidadVentas: number;
  promedioVenta: number;
}

export interface HoraMayorVenta {
  hora: string;
  cantidad: number;
}
