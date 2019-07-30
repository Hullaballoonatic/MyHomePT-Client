import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ActiveTaskComponent } from './active.component'

describe('ActiveTaskComponent', () => {
    let component: ActiveTaskComponent
    let fixture: ComponentFixture<ActiveTaskComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ActiveTaskComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveTaskComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
