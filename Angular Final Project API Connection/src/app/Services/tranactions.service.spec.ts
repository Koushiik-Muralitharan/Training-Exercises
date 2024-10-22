import { TestBed } from '@angular/core/testing';

import { TranactionsService } from './tranactions.service';

describe('TranactionsService', () => {
  let service: TranactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
