import { Injectable } from '@angular/core'
import { EmailComposer } from '@ionic-native/email-composer/ngx'
import { User } from '../../models/entity/user/user'

class Email {
    constructor() {

    }
}

@Injectable({ providedIn: 'root' })
export class EmailComposerService {
    static appEmail: string = 'myhomept@gmail.com'

    constructor(private emailComposer: EmailComposer) {

    }

    send(
        to: string,
        subject: string,
        body: string,
        cc: string = EmailComposerService.appEmail,
        bcc?: string,
        attachments: string[] = [],
        isHtml: boolean = true) {

    }

    verifyEmail(address: string) {
        const body = ``
        this.send(address, 'My Home PT Email Verification', body)
    }

    resetPassword(address: string) {
        const body = ``
        this.send(address, 'My Home PT Password Reset', body)
    }

    invitePatient(therapist: User, patientEmail: string) {
        const body = `${therapist.name.display} would like you to be their PT patient in the My Home PT app. 
        
        Please follow this link to download the app, and use this email address when completing registration.
        https://play.google.com/store/apps/details?id=com.myhomept.app
        `
        this.send(patientEmail, 'My Home PT Password Reset', body)
    }
}
