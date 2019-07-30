import { BaseType } from '../types'
import { ApiService } from '../../services/http/api.service'
import { AppService } from '../../services/app.service'
import { Observable } from 'rxjs'

export abstract class EntityService<T extends BaseType> {
    protected abstract api: ApiService
    protected abstract app: AppService

    protected constructor(protected tableName: string) {
    }

    public get default(): Observable<any> {
        return this.api.get(`${this.tableName}/`)
    }

    public get all(): Observable<T[]> {
        return this.api.get<T[]>(`${this.tableName}/all/`)
    }

    public getInDateRange(start: Date, end: Date): Observable<T[]> {
        return this.api.get<T[]>(`${this.tableName}/date`, { start, end })
    }

    public byId(id: string): Observable<T> {
        return this.api.get<T>(`${this.tableName}/${id}`)
    }

    public save(o: T | T[]): Observable<T | T[]> {
        if (Array.isArray(o)) {
            if (o[0]._id) {
                console.log('update []')
                return this.api.patch<T[]>(`${this.tableName}`, o)
            } else {
                console.log('create []')
                return this.api.put<T[]>(`${this.tableName}`, o)
            }
        } else {
            if (o._id) {
                console.log('update')
                return this.api.patch<T>(`${this.tableName}/${o._id}`, o)
            } else {
                console.log('create')
                return this.api.put<T>(`${this.tableName}`, o)
            }
        }
    }

    public delete(id: string): Observable<void> {
        return this.api.delete(`${this.tableName}/${id}`)
    }

    public searchBy(field: string, regex: string): Observable<T[]> {
        return this.api.get<T[]>(`${this.tableName}/search`, { field, regex })
    }
}
