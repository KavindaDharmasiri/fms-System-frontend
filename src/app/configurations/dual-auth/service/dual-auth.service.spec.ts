import { TestBed } from '@angular/core/testing';

import { DualAuthService } from './dual-auth.service';

describe('DualAuthService', () => {
  let service: DualAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DualAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
