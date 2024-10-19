import { TestBed } from '@angular/core/testing';

import { MediasfuAngularService } from './mediasfu-angular.service';

describe('MediasfuAngularService', () => {
  let service: MediasfuAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediasfuAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
