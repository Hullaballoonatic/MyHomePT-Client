import { TestBed } from '@angular/core/testing'

import { EmailComposerService } from './email-composer.service'

describe('EmailComposerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it('should be created', () => {
        const service: EmailComposerService = TestBed.get(EmailComposerService)
        expect(service).toBeTruthy()
    })
})
