import { Injectable } from '@angular/core'
import { User } from '../../../models/entity/user/user'
import { JWT } from '../../../models/types'

export type Field = 'user' | 'flexdotIds' | 'token'

@Injectable({ providedIn: 'root' })
export class StorageService {
    public get user(): User {
        return this.get('user')
    }

    public set user(v: User) {
        this.set('user', v)
    }

    public get flexdotIds(): any[] {
        return this.get('flexdotIds')
    }

    public set flexdotIds(v: any[]) {
        this.set('flexdotIds', v)
    }

    public get token(): JWT {
        return this.get('token')
    }

    public set token(v: JWT) {
        this.set('token', v)
    }

    public clear(...fields: Field[]): void {
        fields.forEach(localStorage.removeItem)
    }

    public set<T>(field: Field, v: T) {
        localStorage.setItem(field, JSON.stringify(v))
    }

    public get<T>(field: Field): T {
        return JSON.parse(localStorage.getItem(field))
    }
}
