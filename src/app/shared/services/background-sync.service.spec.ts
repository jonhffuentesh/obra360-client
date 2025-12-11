/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackgroundSyncService } from './background-sync.service';

describe('Service: BackgroundSync', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundSyncService]
    });
  });

  it('should ...', inject([BackgroundSyncService], (service: BackgroundSyncService) => {
    expect(service).toBeTruthy();
  }));
});
