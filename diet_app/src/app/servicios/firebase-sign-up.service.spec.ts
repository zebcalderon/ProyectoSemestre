import { TestBed } from '@angular/core/testing';

import { FirebaseSignUpService } from './firebase-sign-up.service';

describe('FirebaseSignUpService', () => {
  let service: FirebaseSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
