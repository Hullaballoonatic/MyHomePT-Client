import { Injectable } from '@angular/core'
import moment, { Moment } from 'moment'
import { JWT } from '../../models/types'
import { StorageService } from './files/storage.service'
import { get } from 'lodash'

@Injectable({ providedIn: 'root' })
export class TokenService {
    constructor(private storage: StorageService) {
    }

    get expiresOn(): Moment {
        const exp = this.token.exp
        return exp && moment.unix(exp)
    }

    get issuedOn(): Moment {
        const iat = this.token.iat
        return iat && moment.unix(iat)
    }

    get signature(): string {
        return get(this.token, [ 'signature' ])
    }

    get token(): JWT {
        return this.storage.token
    }

    set token(v: JWT) {
        this.storage.token = v
    }

    clear(): void {
        this.storage.clear('token')
    }

    public toString(): string {
        const exp = this.expiresOn
        const iat = this.issuedOn
        const signature = this.signature
        if (exp && iat && signature) {
            return `exp: ${exp} (${exp.fromNow()})\niat: ${iat} (${iat.fromNow()})\nsignature:\n${signature}`
        }
    }
}
