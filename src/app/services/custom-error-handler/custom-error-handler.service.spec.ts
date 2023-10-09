import { TestBed } from '@angular/core/testing';

import { CustomErrorHandler } from './custom-error-handler.service';

describe('CustomErrorHandlerService', () => {
  let service: CustomErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
