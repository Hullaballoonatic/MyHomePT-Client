import { TestBed } from '@angular/core/testing'

import { ErrorsInterceptor } from './errors.interceptor'

describe('ErrorsInterceptor', () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it('should be created', () => {
        const service: ErrorsInterceptor = TestBed.get(ErrorsInterceptor)
        expect(service).toBeTruthy()
    })
})
