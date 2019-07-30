import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ExerciseChooser } from './exercise-chooser.component'

describe('ExerciseChooser', () => {
    let component: ExerciseChooser
    let fixture: ComponentFixture<ExerciseChooser>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ExerciseChooser ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ExerciseChooser)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
