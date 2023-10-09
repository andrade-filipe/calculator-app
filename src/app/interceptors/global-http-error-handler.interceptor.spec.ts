import { TestBed } from '@angular/core/testing';
import { GlobalHttpErrorHandler } from './global-http-error-handler.interceptor';

describe('GlobalHttpErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalHttpErrorHandler
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalHttpErrorHandler = TestBed.inject(GlobalHttpErrorHandler);
    expect(interceptor).toBeTruthy();
  });
});
