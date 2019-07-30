import { TestBed } from '@angular/core/testing'

import { InspiringMessageService } from './inspiring-message.service'

describe('InspiringMessageService', () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it('should be created', () => {
        const service: InspiringMessageService = TestBed.get(InspiringMessageService)
        expect(service).toBeTruthy()
    })
})
