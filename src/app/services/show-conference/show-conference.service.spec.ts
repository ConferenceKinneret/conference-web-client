import { TestBed } from '@angular/core/testing';

import { ShowConferenceService } from './show-conference.service';

describe('ShowConferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowConferenceService = TestBed.get(ShowConferenceService);
    expect(service).toBeTruthy();
  });
});
