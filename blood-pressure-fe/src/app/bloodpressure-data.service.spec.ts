import { TestBed } from '@angular/core/testing';

import { BloodpressureDataService } from './bloodpressure-data.service';

describe('BloodpressureDataService', () => {
  let service: BloodpressureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodpressureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
