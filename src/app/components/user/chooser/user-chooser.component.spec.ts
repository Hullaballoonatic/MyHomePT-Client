import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserChooser } from './user-chooser.component'

describe('UserChooser', () => {
    let component: UserChooser
    let fixture: ComponentFixture<UserChooser>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UserChooser ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(UserChooser)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
