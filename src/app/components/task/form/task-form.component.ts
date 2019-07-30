import { Component, Input } from '@angular/core'
import { Task } from '../../../models/entity/task/task'
import { User } from '../../../models/entity/user/user'
import { Exercise } from '../../../models/entity/exercise/exercise'
import { AppService } from '../../../services/app.service'
import { FormBuilder } from '@angular/forms'
import { UserService } from '../../../services/http/entities/user.service'
import { ExerciseService } from '../../../services/http/entities/exercise.service'
import { Frequency, TimeUnitOptions, TimeUnitSymbols, toFreqStr } from '../../../models/entity/task/frequency'
import { Period, toPeriodStr } from '../../../models/entity/task/period'
import { find, get, range, union } from 'lodash'
import moment from 'moment'
import { EntityFormModal } from '../../../models/entity/entity-form-modal'
import { TaskService } from '../../../services/http/entities/task.service'
import { UserChooser } from '../../user/chooser/user-chooser.component'
import { ExerciseChooser } from '../../exercise/chooser/exercise-chooser.component'

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: [ './task-form.component.scss' ],
})
export class TaskFormModal extends EntityFormModal<Task> {
    @Input() existingEntity: Task = {
        numReps: 1,
        numSets: 1,
        frequency: {
            times: 1,
            period: {
                amount: 1,
                unit: 'w',
            },
        },
        holdTime: {
            amount: 1,
            unit: 's',
        },
        completeBy: moment().add(1, 'w').toDate(),
    }
    users: User[] = []
    exercises: Exercise[] = []
    today: string
    issuerName: string
    exerciseTitle: string
    targetName: string
    frequencyString: string
    holdTimeString: string

    constructor(app: AppService,
                fb: FormBuilder,
                service: TaskService,
                protected userService: UserService,
                protected exerciseService: ExerciseService) {
        super(app, fb, service)
    }

    private _issuer: User = this.issuer

    get issuer(): User {
        return this._issuer || this.form && find(this.users, it => it._id == this.form.value.issuerId)
    }

    set issuer(v: User) {
        this.form.patchValue({ issuerId: v && v._id })
        this._issuer = v
        this.issuerName = v && v.name.display
    }

    private _exercise: Exercise = this.exercise

    get exercise(): Exercise {
        return this._exercise || this.form && find(this.exercises, it => it._id == this.form.value.exerciseId)
    }

    set exercise(v: Exercise) {
        this.form.patchValue({ exerciseId: v && v._id })
        this._exercise = v
        this.exerciseTitle = v && v.title
    }

    private _target: User = this.target

    get target(): User {
        return this._target || this.form && find(this.users, it => it._id == this.form.value.targetId)
    }

    set target(v: User) {
        this.form.patchValue({ targetId: v && v._id })
        this._target = v
        this.targetName = v && v.name.display
    }

    get frequency(): Frequency {
        return this.form && this.form.value.frequency
    }

    set frequency(v: Frequency) {
        this.form && this.form.patchValue({ frequency: v })
        this.frequencyString = toFreqStr(v)
    }

    get holdTime(): Period {
        return this.form && this.form.value.holdTime
    }

    set holdTime(v: Period) {
        this.form.patchValue({ holdTime: v })
        this.holdTimeString = toPeriodStr(v)
    }

    get completeByISO(): string {
        return this.form.value.completeBy && moment(this.form.value.completeBy).toISOString()
    }

    get defaultTitle(): string {
        if (this.issuer) {
            return `${this.issuer.name.given}'s ${this.exerciseTitle ? this.exerciseTitle + ' ' : ''}Task`
        } else {
            return `My ${this.exerciseTitle ? this.exerciseTitle + ' ' : ''}Task`
        }
    }

    get entity(): Task {
        const task = super.entity
        if (!task.issuerId) {
            task.issuerId = this.app.curUser._id
        }
        if (!task.targetId) {
            task.targetId = this.app.curUser._id
        }
        if (!task.title) {
            task.title = this.defaultTitle
        }
        return task
    }

    pickHoldTime(): void {
        const holdTime: Period = this.holdTime
        this.app.view.picker.present<Period>([
            { name: 'amount', options: range(1, 101).map(it => ({ text: it, value: it })), selectedIndex: holdTime && holdTime.amount - 1 },
            { name: 'unit', options: TimeUnitOptions, selectedIndex: TimeUnitSymbols.indexOf(holdTime && holdTime.unit) },
        ]).then(res => {
            if (res) {
                this.holdTime = res
            }
        }).catch()
    }

    pickFrequency(): void {
        const freq: Frequency = this.frequency
        this.app.view.picker.present<any>([
            {
                name: 'times',
                options: range(1, 101).map(it => ({ text: it, value: it })),
                selectedIndex: freq && freq.times - 1,
                suffix: 'times',
            },
            {
                name: 'amount',
                options: range(1, 101).map(it => ({ text: it, value: it })),
                selectedIndex: freq && freq.period.amount - 1,
                prefix: 'every',
            },
            { name: 'unit', options: TimeUnitOptions, selectedIndex: TimeUnitSymbols.indexOf(freq && freq.period.unit) },
        ]).then(res => {
            if (res) {
                this.frequency = { times: res.times, period: { amount: res.amount, unit: res.unit } }
            }
        }).catch()
    }

    chooseIssuer(): void {
        this.userService.all.subscribe(users => {
            this.app.view.modal.present<User>(UserChooser, { choices: users })
                .then(res => this.issuer = res)
        })
    }

    chooseTarget(): void {
        this.app.view.modal.present(UserChooser, { choices: this.users })
            .then((res: User) => this.target = res)
    }

    chooseExercise(): void {
        this.app.view.modal.present(ExerciseChooser, { choices: this.exercises })
            .then((res: Exercise) => {
                if (res) {
                    this.exercise = res
                }
            })
    }

    buildForm(): void {
        this.form = this.fb.group({
            issuerId: [ get(this.existingEntity, [ 'issuerId' ]) ],
            targetId: [ get(this.existingEntity, [ 'targetId' ]) ],
            exerciseId: [ get(this.existingEntity, [ 'exerciseId' ]) ],
            title: [ get(this.existingEntity, [ 'title' ]) ],
            holdTime: [ get(this.existingEntity, [ 'holdTime' ]) ],
            numReps: [ get(this.existingEntity, [ 'numReps' ]) ],
            numSets: [ get(this.existingEntity, [ 'numSets' ]) ],
            frequency: [ get(this.existingEntity, [ 'frequency' ]) ],
            completeBy: [ get(this.existingEntity, [ 'completeBy' ]) ],
            details: [ get(this.existingEntity, [ 'details' ]) ],
        })
    }

    ngOnInit(): void {
        super.ngOnInit()
        if (this.isEditForm) {
            this.userService.byId(this.existingEntity.issuerId).subscribe(
                iss => this.userService.getPatientsOfUser(this.existingEntity.issuerId).subscribe(
                    pats => this.users = union(pats, [ iss ]), () => this.users = [ iss ],
                ),
            )
        } else {
            this.userService.curUserPatients.subscribe(
                pats => {
                    this.users = pats
                    this.users.push(this.app.curUser)
                },
                () => this.users = [ this.app.curUser ],
            )
        }
        this.exerciseService.default.subscribe(
            (defaultExercises: Exercise[]) => this.userService.curUserCreatedExercises.subscribe(
                (createdExercises: Exercise[]) => this.exercises = union(defaultExercises, createdExercises),
                () => this.exercises = defaultExercises,
            ),
        )
        this.today = moment().toISOString()
        const issuer = this.issuer
        const target = this.target
        const exercise = this.exercise
        this.issuerName = issuer && issuer.name.display
        this.targetName = target && target.name.display
        this.exerciseTitle = exercise && exercise.title
        this.frequencyString = toFreqStr(this.frequency)
        this.holdTimeString = toPeriodStr(this.holdTime)
    }
}
