import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { 
  VentaHoy, 
  FacturaHoy, 
  ProductoStockBajo, 
  ProductoMasVendido, 
  DiaMayorVenta, 
  HoraMayorVenta 
} from '../interfaces/dashboard.interface';

interface ApiResponse<T> {
  facturas?: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.api}/dashboard`;

  constructor(private http: HttpClient) { }

  // Obtener resumen de ventas del día
  getVentasHoy(): Observable<VentaHoy> {
    return this.http.get<VentaHoy>(`${this.apiUrl}/ventas-hoy`);
  }

  // Obtener facturas del día
  getFacturasHoy(): Observable<FacturaHoy[]> {
    return this.http.get<ApiResponse<FacturaHoy>>(`${this.apiUrl}/facturas-hoy`).pipe(
      map(response => {
        // Extraer el array de facturas de la respuesta
        if (response.facturas) {
          return response.facturas;
        }
        return [];
      })
    );
  }

  // Obtener productos con stock bajo
  getProductosStockBajo(): Observable<ProductoStockBajo[]> {
    return this.http.get<ProductoStockBajo[]>(`${this.apiUrl}/productos-stock-bajo`);
  }

  // Obtener producto más vendido
  getProductoMasVendido(): Observable<ProductoMasVendido> {
    return this.http.get<ProductoMasVendido>(`${this.apiUrl}/producto-mas-vendido`);
  }

  // Obtener día con mayor venta
  getDiaMayorVenta(): Observable<DiaMayorVenta> {
    return this.http.get<DiaMayorVenta>(`${this.apiUrl}/dia-mayor-venta`);
  }

  // Obtener hora con mayor venta
  getHoraMayorVenta(): Observable<HoraMayorVenta> {
    return this.http.get<HoraMayorVenta>(`${this.apiUrl}/hora-mayor-venta`);
  }
}
