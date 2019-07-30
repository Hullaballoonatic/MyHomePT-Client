import { TestBed } from '@angular/core/testing'

import { ProfilerInterceptor } from './profiler.interceptor'

describe('ProfilerInterceptor', () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it('should be created', () => {
        const service: ProfilerInterceptor = TestBed.get(ProfilerInterceptor)
        expect(service).toBeTruthy()
    })
})
