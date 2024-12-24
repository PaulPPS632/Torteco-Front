import { TestBed } from '@angular/core/testing';

import { ComsumeService } from './comsume.service';

describe('ComsumeService', () => {
  let service: ComsumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComsumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
