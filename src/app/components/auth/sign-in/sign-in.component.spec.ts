import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SignInModal } from './sign-in.component'

describe('SignInModal', () => {
    let component: SignInModal
    let fixture: ComponentFixture<SignInModal>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SignInModal ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInModal)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
