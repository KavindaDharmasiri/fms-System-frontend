import { TestBed } from '@angular/core/testing';

import { HighRiskService } from './high-risk.service';

describe('HighRiskService', () => {
  let service: HighRiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighRiskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
