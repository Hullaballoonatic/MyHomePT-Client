import { Component, Input, OnInit } from '@angular/core'
import { AppService } from '../../../services/app.service'
import { EntityChooser } from '../../../models/entity/entity-chooser'
import { Exercise } from '../../../models/entity/exercise/exercise'
import { ExerciseService } from '../../../services/http/entities/exercise.service'
import { BODY_PARTS } from '../../../models/entity/exercise/body-part'

@Component({
    selector: 'app-exercise-chooser',
    templateUrl: './exercise-chooser.component.html',
    styleUrls: [ './exercise-chooser.component.scss' ],
})
export class ExerciseChooser extends EntityChooser<Exercise> implements OnInit {
    @Input() choices: Exercise[]
    bodyParts = BODY_PARTS
    expandedCategories: Set<string> = new Set()
    exercisesByBodyPart: Map<string, Exercise[]> = new Map()

    constructor(private app: AppService, service: ExerciseService) {
        super(service)
    }

    getTitle(exercise: Exercise): string {
        return exercise.title
    }

    getPicture(exercise: Exercise): string {
        return exercise.picture
    }

    submit(): void {
        this.app.view.modal.dismiss(this.selected[0])
    }

    isExpanded(category: string): boolean {
        return this.expandedCategories.has(category)
    }

    expand(category: string): void {
        this.expandedCategories.add(category)
    }

    collapse(category: string): void {
        this.expandedCategories.delete(category)
    }

    toggle(category: string): void {
        this.isExpanded(category) ? this.collapse(category) : this.expand(category)
    }

    click(exercise: Exercise): void {
        if (this.selected.includes(exercise)) {
            this.deselect(exercise)
        } else {
            this.select(exercise)
        }
    }

    dismiss() {
        this.app.view.modal.dismiss()
    }

    ngOnInit(): void {
        this.bodyParts.forEach(it => this.exercisesByBodyPart[it] = [])
        this.choices && this.choices.forEach(it => this.exercisesByBodyPart[it.bodyPart].push(it))
    }
}
