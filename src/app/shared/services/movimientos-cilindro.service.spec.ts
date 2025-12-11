/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovimientosCilindroService } from './movimientos-cilindro.service';

describe('Service: MovimientosCilindro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimientosCilindroService]
    });
  });

  it('should ...', inject([MovimientosCilindroService], (service: MovimientosCilindroService) => {
    expect(service).toBeTruthy();
  }));
});
