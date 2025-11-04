import { TestBed } from '@angular/core/testing';

import { ReactionTemplateService } from './reaction-template.service';

describe('ReactionTemplateService', () => {
  let service: ReactionTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactionTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
