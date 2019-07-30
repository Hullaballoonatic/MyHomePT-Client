import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SignUpModal } from './sign-up.component'

describe('SignUpModal', () => {
    let component: SignUpModal
    let fixture: ComponentFixture<SignUpModal>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SignUpModal ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpModal)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
