import { Injectable } from '@angular/core'
import { Inspiration } from '../../../models/entity/inspiration/inspiration'
import { EntityService } from '../../../models/entity/entity-service'
import { ApiService } from '../api.service'
import { AppService } from '../../app.service'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class InspiringMessageService extends EntityService<Inspiration> {
    constructor(protected api: ApiService, protected app: AppService) {
        super('inspiration')
    }

    public get randomMessage(): Observable<Inspiration> {
        return super.default
    }
}
