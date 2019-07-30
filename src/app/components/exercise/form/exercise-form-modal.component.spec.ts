import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ExerciseFormModal } from './exercise-form-modal.component'

describe('ExerciseFormModal', () => {
    let component: ExerciseFormModal
    let fixture: ComponentFixture<ExerciseFormModal>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ExerciseFormModal ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ExerciseFormModal)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
