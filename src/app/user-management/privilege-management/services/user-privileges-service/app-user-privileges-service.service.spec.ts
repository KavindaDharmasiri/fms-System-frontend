import { TestBed } from '@angular/core/testing';

import { AppUserPrivilegesServiceService } from './app-user-privileges-service.service';

describe('AppUserPrivilegesServiceService', () => {
  let service: AppUserPrivilegesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUserPrivilegesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
