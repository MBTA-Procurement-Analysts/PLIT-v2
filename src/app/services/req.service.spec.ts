import { TestBed } from '@angular/core/testing';

import { ReqService } from './req.service';

describe('ReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqService = TestBed.get(ReqService);
    expect(service).toBeTruthy();
  });
});
