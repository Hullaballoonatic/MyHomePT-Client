import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserFormModal } from './user-form.component'

describe('UserFormModal', () => {
    let component: UserFormModal
    let fixture: ComponentFixture<UserFormModal>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UserFormModal ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(UserFormModal)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
