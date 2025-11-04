import { TestBed } from '@angular/core/testing';

import { RuleGroupService } from './rule-group.service';

describe('RuleGroupService', () => {
  let service: RuleGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
