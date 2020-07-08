import { TestBed } from '@angular/core/testing';

import { ReqPrintingService } from './req-printing.service';

describe('ReqPrintingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqPrintingService = TestBed.get(ReqPrintingService);
    expect(service).toBeTruthy();
  });
});
