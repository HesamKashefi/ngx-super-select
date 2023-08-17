import { TestBed } from '@angular/core/testing';

import { NgxSuperSelectService } from './ngx-super-select.service';

describe('NgxSuperSelectService', () => {
  let service: NgxSuperSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSuperSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
