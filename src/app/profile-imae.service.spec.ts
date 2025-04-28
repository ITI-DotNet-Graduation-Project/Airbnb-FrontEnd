import { TestBed } from '@angular/core/testing';

import { ProfileImaeService } from './profile-imae.service';

describe('ProfileImaeService', () => {
  let service: ProfileImaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileImaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
