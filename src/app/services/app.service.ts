import { Injectable, NgZone } from '@angular/core'
import { ViewService } from './view/view.service'
import { SettingsService } from './settings.service'
import { MessageService } from './utility/message.service'
import { FileService } from './utility/files/file.service'
import { Credentials } from '../models/types'
import { Router } from '@angular/router'
import { User } from '../models/entity/user/user'

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(public view: ViewService,
                public settings: SettingsService,
                public messages: MessageService,
                public files: FileService,
                private router: Router,
                private zone: NgZone) {
    }

    private _credentials: Credentials

    get credentials(): Credentials {
        return this._credentials || {}
    }

    set credentials(v: Credentials) {
        this._credentials = v
    }

    private _curUser: User = this.files.storage.user

    get curUser(): User {
        return this._curUser
    }

    set curUser(v: User) {
        this.files.storage.user = v
        this._curUser = v
    }

    get mode(): 'patient' | 'therapist' | 'developer' {
        if (this._curUser) {
            if (this._curUser.privilege <= 20) {
                return 'patient'
            } else if (this._curUser.privilege <= 60) {
                return 'therapist'
            }
        }
        return 'developer'
    }

    navigate(page: string) {
        return this.zone.run(() => this.router.navigate([ page ]))
    }

    error(err: any, category?: string): any {
        return (this.messages.error(err, category))
    }

    log(message: string, category?: string): string {
        return this.messages.log(message, category)
    }
}
