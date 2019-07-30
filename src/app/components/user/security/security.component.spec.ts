import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SecurityModal } from './security.component'

describe('SecurityModal', () => {
    let component: SecurityModal
    let fixture: ComponentFixture<SecurityModal>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SecurityModal ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SecurityModal)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
