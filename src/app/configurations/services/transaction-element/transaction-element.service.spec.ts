import { TestBed } from '@angular/core/testing';

import { TransactionElementService } from './transaction-element.service';

describe('TransactionElementService', () => {
  let service: TransactionElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
