import { TestBed } from '@angular/core/testing';

import { BuildConferenceService } from './build-conference.service';

describe('BuildConferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildConferenceService = TestBed.get(BuildConferenceService);
    expect(service).toBeTruthy();
  });
});
