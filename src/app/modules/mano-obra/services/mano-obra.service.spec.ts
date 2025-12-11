import { TestBed } from '@angular/core/testing';

import { ManoObraService } from './mano-obra.service';

describe('ManoObraService', () => {
  let service: ManoObraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManoObraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
