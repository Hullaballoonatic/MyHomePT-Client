import { Injectable } from '@angular/core'
import { ApiService } from '../api.service'
import { Exercise } from '../../../models/entity/exercise/exercise'
import { AppService } from '../../app.service'
import { EntityService } from '../../../models/entity/entity-service'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ExerciseService extends EntityService<Exercise> {
    constructor(protected api: ApiService, protected app: AppService) {
        super('exercises')
    }

    public get curUserCreatedExercises(): Observable<Exercise[]> {
        return this.api.get<Exercise[]>('users/exercises')
    }
}
