import { TestBed } from '@angular/core/testing';

import { ApiRegUserService } from './api-reg-user.service';

describe('ApiRegUserService', () => {
  let service: ApiRegUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRegUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
