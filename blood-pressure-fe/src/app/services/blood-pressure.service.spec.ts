import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { BloodPressureService } from './blood-pressure.service';

describe('BloodPressureService', () => {
  let service: BloodPressureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BloodPressureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
