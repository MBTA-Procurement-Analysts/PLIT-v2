import { TestBed } from '@angular/core/testing';

import { LastupdatedService } from './lastupdated.service';

describe('LastupdatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LastupdatedService = TestBed.get(LastupdatedService);
    expect(service).toBeTruthy();
  });
});
