/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuerysBdService } from './querys-bd.service';

describe('Service: CilindrosBd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuerysBdService]
    });
  });

  it('should ...', inject([QuerysBdService], (service: QuerysBdService) => {
    expect(service).toBeTruthy();
  }));
});
