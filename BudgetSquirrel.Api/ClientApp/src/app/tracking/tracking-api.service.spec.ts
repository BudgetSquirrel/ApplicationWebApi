import { TestBed } from '@angular/core/testing';

import { TrackingApiService } from './tracking-api.service';

describe('TrackingApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackingApiService = TestBed.get(TrackingApiService);
    expect(service).toBeTruthy();
  });
});
