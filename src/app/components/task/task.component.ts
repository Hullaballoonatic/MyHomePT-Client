import { Component, Input, NgZone, OnInit } from '@angular/core'
import { Task } from '../../models/entity/task/task'
import { Observable } from 'rxjs'
import { FlexdotService } from '../../services/bluetooth/flexdot.service'
import { Flexdot } from '../../models/flexdot'
import { Exercise } from '../../models/entity/exercise/exercise'
import { ExerciseService } from '../../services/http/entities/exercise.service'
import { toPeriodStr } from '../../models/entity/task/period'
import { AppService } from '../../services/app.service'
import { FlexdotComponent } from '../flexdot/flexdot.component'
import { TaskService } from '../../services/http/entities/task.service'
import { ActiveTaskComponent } from './active/active.component'

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: [ './task.component.scss' ],
})
export class TaskComponent implements OnInit {
    @Input() task: Task
    exercise: Exercise
    recentSummary: { durationStr: string, score: number }

    constructor(private app: AppService,
                private service: TaskService,
                private zone: NgZone,
                private flexdotService: FlexdotService,
                private exerciseService: ExerciseService) {
    }

    get flexdots$(): Observable<Flexdot[]> {
        return this.flexdotService.flexdots$
    }

    get holdTimeStr(): string {
        return this.task.holdTime && toPeriodStr(this.task.holdTime)
    }

    get numComplete() {
        return this.task.setRecordings.length
    }

    get hasFlexdots(): boolean {
        return !this.flexdotService.isEmpty
    }

    dismiss(): void {
        this.service.save(this.task).subscribe(it => this.app.view.modal.dismiss(it), err => {
            this.app.error(err)
            this.app.view.modal.dismiss()
        })
    }

    presentFlexdotSearch(): Promise<any> {
        return this.app.view.modal.present<Flexdot>(FlexdotComponent)
    }

    begin(): void {
        this.app.view.modal.present<{ durationStr: string, score: number }>(ActiveTaskComponent)
            .then(summary => {
                if (summary) {
                    this.recentSummary = summary
                }
            })
    }

    ngOnInit(): void {
        if (this.task.exerciseId) {
            this.exerciseService.byId(this.task.exerciseId).subscribe(it => this.exercise = it)
        }
    }
}
