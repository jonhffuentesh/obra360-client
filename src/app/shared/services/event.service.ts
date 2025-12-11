import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private stockUpdated = new Subject<void>();
  stockUpdated$ = this.stockUpdated.asObservable();

  emitStockUpdated(): void {
    this.stockUpdated.next();
  }
} 