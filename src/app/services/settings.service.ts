import { Injectable } from '@angular/core'
import { isBoolean } from 'lodash'

@Injectable({ providedIn: 'root' })
export class SettingsService {
    get autologin(): boolean {
        return this.get('autologin')
    }

    set autologin(v: boolean) {
        this.set('autologin', v)
    }

    toggle(setting): void {
        const v = this.get(setting)
        if (v === null || v === false) {
            this.set(setting, true)
        } else if (v === true) {
            this.set(setting, false)
        } else {
            throw(`${setting} is not a boolean.`)
        }
    }

    get(key: string): any {
        return JSON.parse(localStorage.getItem(key))
    }

    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}
