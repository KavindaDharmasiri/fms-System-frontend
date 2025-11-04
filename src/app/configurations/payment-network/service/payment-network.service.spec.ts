import { TestBed } from '@angular/core/testing';

import { PaymentNetworkService } from './payment-network.service';

describe('PaymentNetworkService', () => {
  let service: PaymentNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
