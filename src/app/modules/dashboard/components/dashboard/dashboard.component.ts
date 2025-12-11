import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { firstValueFrom } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { 
  VentaHoy, 
  FacturaHoy, 
  ProductoStockBajo, 
  ProductoMasVendido, 
  DiaMayorVenta, 
  HoraMayorVenta 
} from '../../interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ChartModule,
    ButtonModule,
    ProgressBarModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  ventasHoy: VentaHoy = { totalVentas: 0, cantidadVentas: 0, promedioVenta: 0 };
  facturasHoy: FacturaHoy[] = [];
  productosStockBajo: ProductoStockBajo[] = [];
  productoMasVendido: ProductoMasVendido | null = null;
  diaMayorVenta: DiaMayorVenta | null = null;
  horaMayorVenta: HoraMayorVenta | null = null;
  
  loading = true;
  chartData: any;
  chartOptions: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.cargarDashboard();
    this.inicializarGraficos();
  }

  cargarDashboard() {
    this.loading = true;
    console.log('Iniciando carga del dashboard...');
    
    // Cargar todas las métricas
    Promise.all([
      this.cargarVentasHoy(),
      this.cargarFacturasHoy(),
      this.cargarProductosStockBajo(),
      this.cargarProductoMasVendido(),
      this.cargarDiaMayorVenta(),
      this.cargarHoraMayorVenta()
    ]).finally(() => {
      this.loading = false;
      console.log('Dashboard cargado completamente');
    });
  }

  private async cargarVentasHoy() {
    try {
      console.log('Cargando ventas del día...');
      const data = await firstValueFrom(this.dashboardService.getVentasHoy());
      this.ventasHoy = data;
      console.log('Ventas del día cargadas:', this.ventasHoy);
    } catch (error) {
      console.error('Error cargando ventas del día:', error);
      // Datos de ejemplo para testing
      this.ventasHoy = { totalVentas: 1500000, cantidadVentas: 25, promedioVenta: 60000 };
    }
  }

  private async cargarFacturasHoy() {
    try {
      console.log('Cargando facturas del día...');
      const data = await firstValueFrom(this.dashboardService.getFacturasHoy());
      this.facturasHoy = data;
      console.log('Facturas del día cargadas:', this.facturasHoy);
    } catch (error) {
      console.error('Error cargando facturas del día:', error);
      // Datos de ejemplo para testing
      this.facturasHoy = [
        {
          id: 1,
          serial: 'F001-001',
          cliente: {
            id: 1,
            nombre: 'Juan',
            apellido: 'Pérez'
          },
          estado: 'Pagada',
          tipoOperacion: 'Contado',
          total: 45000,
          fecha: new Date().toISOString()
        }
      ];
    }
  }

  private async cargarProductosStockBajo() {
    try {
      console.log('Cargando productos con stock bajo...');
      const data = await firstValueFrom(this.dashboardService.getProductosStockBajo());
      this.productosStockBajo = data;
      console.log('Productos con stock bajo cargados:', this.productosStockBajo);
    } catch (error) {
      console.error('Error cargando productos con stock bajo:', error);
      // Datos de ejemplo para testing
      this.productosStockBajo = [
        {
          id: 1,
          nombre: 'Coca Cola',
          stockActual: 5,
          stockMin: 20,
          imagenUrl: '/assets/images/coca-cola.jpg'
        }
      ];
    }
  }

  private async cargarProductoMasVendido() {
    try {
      console.log('Cargando producto más vendido...');
      const data = await firstValueFrom(this.dashboardService.getProductoMasVendido());
      this.productoMasVendido = data;
      console.log('Producto más vendido cargado:', this.productoMasVendido);
    } catch (error) {
      console.error('Error cargando producto más vendido:', error);
      // Datos de ejemplo para testing
      this.productoMasVendido = {
        id: 10,
        nombre: 'Colombiana 330 cm3',
        descripcion: 'Gaseosa Colombiana',
        categoria: {
          id: 5,
          nombre: 'Gaseosas'
        },
        estadisticas: {
          cantidadVendida: 39,
          totalVendido: 117000,
          promedioPrecio: 3000,
          vecesVendido: 9
        }
      };
    }
  }

  private async cargarDiaMayorVenta() {
    try {
      console.log('Cargando día de mayor venta...');
      const data = await firstValueFrom(this.dashboardService.getDiaMayorVenta());
      this.diaMayorVenta = data;
      console.log('Día de mayor venta cargado:', this.diaMayorVenta);
    } catch (error) {
      console.error('Error cargando día de mayor venta:', error);
      // Datos de ejemplo para testing
      this.diaMayorVenta = {
        fecha: '2025-07-21T05:00:00.000Z',
        totalVentas: 406000,
        cantidadVentas: 11,
        promedioVenta: 36909
      };
    }
  }

  private async cargarHoraMayorVenta() {
    try {
      console.log('Cargando hora de mayor venta...');
      const data = await firstValueFrom(this.dashboardService.getHoraMayorVenta());
      this.horaMayorVenta = data;
      console.log('Hora de mayor venta cargada:', this.horaMayorVenta);
    } catch (error) {
      console.error('Error cargando hora de mayor venta:', error);
      // Datos de ejemplo para testing
      this.horaMayorVenta = {
        hora: '19:00',
        cantidad: 45
      };
    }
  }

  private inicializarGraficos() {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pagada': return 'p-tag-success';
      case 'Pendiente': return 'p-tag-warning';
      case 'Anulada': return 'p-tag-danger';
      default: return 'p-tag-info';
    }
  }

  getTipoClass(tipo: string): string {
    return tipo === 'Credito' ? 'p-tag-warning' : 'p-tag-success';
  }

  getStockPorcentaje(stockActual: number, stockMin: number): number {
    return Math.min((stockActual / stockMin) * 100, 100);
  }

  getStockClass(stockActual: number, stockMin: number): string {
    const porcentaje = this.getStockPorcentaje(stockActual, stockMin);
    if (porcentaje <= 25) return 'p-tag-danger';
    if (porcentaje <= 50) return 'p-tag-warning';
    return 'p-tag-success';
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  }

  recargarDashboard() {
    this.cargarDashboard();
  }
}
