import { Injectable, OnInit } from '@angular/core'
import { ApiService } from '../api.service'
import { Exercise } from '../../../models/entity/exercise/exercise'
import { EntityService } from '../../../models/entity/entity-service'
import { AppService } from '../../app.service'
import { Observable } from 'rxjs'
import { Task } from '../../../models/entity/task/task'
import { User } from '../../../models/entity/user/user'
import { tap } from 'rxjs/internal/operators/tap'
import { of } from 'rxjs/internal/observable/of'

@Injectable({ providedIn: 'root' })
export class UserService extends EntityService<User> implements OnInit {
    constructor(protected api: ApiService, protected app: AppService) {
        super('users')
    }

    private _curUserCreatedExercises: Exercise[]

    get curUserCreatedExercises(): Observable<Exercise[]> {
        return this._curUserCreatedExercises ? of(this._curUserCreatedExercises) : this.refreshCurUserCreatedExercises()
    }

    private _curUser: User

    get curUser(): Observable<User> {
        return this._curUser ? of(this._curUser) : this.refreshCurUser()
    }

    private _curUserTasks: Task[]

    get curUserTasks(): Observable<Task[]> {
        return this._curUserTasks ? of(this._curUserTasks) : this.refreshCurUserTasks()
    }

    private _curUserPatients: User[]

    get curUserPatients(): Observable<User[]> {
        return this._curUserPatients ? of(this._curUserPatients) : this.refreshCurUserPatients()
    }

    private _curUserTherapists: User[]

    get curUserTherapists(): Observable<User[]> {
        return this._curUserTherapists ? of(this._curUserTherapists) : this.refreshCurUserTherapists()
    }

    ngOnInit(): void {
        this.refreshCurUser()
        this.refreshCurUserTasks()
        this.refreshCurUserCreatedExercises()
        this.refreshCurUserPatients()
        this.refreshCurUserTherapists()
    }

    refreshCurUser(): Observable<User> {
        return this.api.get<User>('users').pipe(tap(res => this._curUser = res))
    }

    refreshCurUserTasks(): Observable<Task[]> {
        return this.api.get<Task[]>('users/tasks').pipe(tap(res => this._curUserTasks = res))
    }

    refreshCurUserCreatedExercises(): Observable<Exercise[]> {
        return this.api.get<Exercise[]>('users/exercises').pipe(tap(res => this._curUserCreatedExercises = res))
    }

    refreshCurUserTherapists(): Observable<User[]> {
        return this.api.get<User[]>('users/therapists').pipe(tap(res => this._curUserTherapists = res))
    }

    refreshCurUserPatients(): Observable<User[]> {
        return this.api.get<User[]>('users/patients').pipe(tap(res => this._curUserPatients = res))
    }

    getTasksOfUser(id?: string): Observable<Task[]> {
        return this.api.get<Task[]>(`users/${id && `${id}/`}tasks`)
    }

    getCreatedExercisesOfUser(id?: string): Observable<Exercise[]> {
        return this.api.get<Exercise[]>(`users/${id && `${id}/`}exercises`)
    }

    getPatientsOfUser(id?: string): Observable<User[]> {
        return this.api.get<User[]>(`users/${id && `${id}/`}patients`)
    }

    getTherapistsOfUser(id?: string): Observable<User[]> {
        return this.api.get<User[]>(`users/${id && `${id}/`}therapists`)
    }

    getUserPrivilege(user?: User): Privilege {
        return (user || this._curUser) && scoreToPrivilege[user.privilege]
    }

    updateCurrent(): Observable<User> {
        if (this._curUser) {
            return this.save(this._curUser) as Observable<User>
        }
    }

    assignTherapistToUser(therapistId: string, id: string = this.app.curUser._id): Observable<{ patient, therapist }> {
        return this.api.post(`users/${id}/${therapistId}`)
    }

    assignPatientToUser(patientId: string, id: string = this.app.curUser._id): Observable<{ patient, therapist }> {
        return this.assignTherapistToUser(id, patientId)
    }
}

export const privilegeToScore: { [key: string]: number } = { 'developer': 100, 'therapist': 50, 'patient': 0 }
export const scoreToPrivilege: { [key: number]: Privilege } = { 100: 'developer', 50: 'therapist', 0: 'patient' }

export type Privilege = 'developer' | 'therapist' | 'patient' | ''
