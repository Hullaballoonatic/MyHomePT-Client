import { Injectable } from '@angular/core'
import { AuthService } from './http/auth.service'
import { ApiService } from './http/api.service'
import { UserService } from './http/entities/user.service'
import { TaskService } from './http/entities/task.service'
import { ExerciseService } from './http/entities/exercise.service'

@Injectable({ providedIn: 'root' })
export class RepoService {
    constructor(public auth: AuthService,
                public api: ApiService,
                public users: UserService,
                public tasks: TaskService,
                public exercises: ExerciseService) {
    }
}
