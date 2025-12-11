/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QrService } from './qr.service';

describe('Service: Qr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QrService]
    });
  });

  it('should ...', inject([QrService], (service: QrService) => {
    expect(service).toBeTruthy();
  }));
});
