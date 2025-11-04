import { TestBed } from '@angular/core/testing';

import { ValidateTransactionService } from './validate-transaction.service';

describe('ValidateTransactionService', () => {
  let service: ValidateTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
