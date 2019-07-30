import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { TokenService } from '../utility/token.service'
import { Credentials } from '../../models/types'
import { AppService } from '../app.service'
import { User } from '../../models/entity/user/user'

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private app: AppService, private api: ApiService, private token: TokenService) {
    }

    signout(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.post('signout/').subscribe(() => {
                resolve()
                this.app.curUser = null
                this.token.clear()
            }, reject)
        })
    }

    auth(credentials: Credentials): Promise<User> {
        this.app.credentials = credentials
        return new Promise<User>((resolve, reject) => {
            if (credentials.name) {
                this.api.put('auth/', credentials).subscribe(res => resolve(this.onNextAuth(res)), reject)
            } else {
                this.api.post('auth/', credentials).subscribe(res => resolve(this.onNextAuth(res)), reject)
            }
        })
    }

    private onNextAuth(httpResult): User {
        this.app.curUser = {
            address: httpResult.address,
            birthday: httpResult.birthday,
            createdExerciseIds: httpResult.createdExerciseIds,
            createdOn: httpResult.createdOn,
            email: httpResult.email,
            name: httpResult.name,
            patientIds: httpResult.patientIds,
            phoneNumber: httpResult.phoneNumber,
            picture: httpResult.picture,
            privilege: httpResult.privilege,
            sex: httpResult.sex,
            signedInOn: httpResult.signedInOn,
            signedOutOn: httpResult.signedOutOn,
            therapistIds: httpResult.therapistIds,
            updatedOn: httpResult.updatedOn,
            _id: httpResult._id,
        }
        this.token.token = {
            signature: httpResult.signature,
            exp: httpResult.exp,
            iat: httpResult.iat,
        }
        return httpResult
    }
}
