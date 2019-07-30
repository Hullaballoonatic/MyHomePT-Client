import { TestBed } from '@angular/core/testing'

import { NotifierInterceptor } from './notifier.interceptor'

describe('NotifierInterceptor', () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it('should be created', () => {
        const service: NotifierInterceptor = TestBed.get(NotifierInterceptor)
        expect(service).toBeTruthy()
    })
})
