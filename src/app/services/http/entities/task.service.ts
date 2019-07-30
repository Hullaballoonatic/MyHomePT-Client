import { Injectable } from '@angular/core'
import { ApiService } from '../api.service'
import { Task } from '../../../models/entity/task/task'
import { EntityService } from '../../../models/entity/entity-service'
import { AppService } from '../../app.service'

@Injectable({ providedIn: 'root' })
export class TaskService extends EntityService<Task> {
    constructor(protected api: ApiService, protected app: AppService) {
        super('tasks')
    }
}
