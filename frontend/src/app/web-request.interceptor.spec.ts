import { TestBed } from '@angular/core/testing';

import { WebReqInterceptor } from './web-request.interceptor';

describe('WebRequestInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebReqInterceptor = TestBed.get(WebReqInterceptor);
    expect(service).toBeTruthy();
  });
});
