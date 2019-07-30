import { TestBed } from '@angular/core/testing'

import { FlexdotService } from './flexdot.service'

describe('FlexdotService', () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it('should be created', () => {
        const service: FlexdotService = TestBed.get(FlexdotService)
        expect(service).toBeTruthy()
    })
})
