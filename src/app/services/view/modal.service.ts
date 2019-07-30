import { Injectable } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { MessageService } from '../utility/message.service'

@Injectable({ providedIn: 'root' })
export class ModalService {
    modals = []

    constructor(private ctrl: ModalController, private messages: MessageService) {
    }

    async present<T>(component, passedArgs?): Promise<T> {
        const modal = await this.ctrl.create({ component, componentProps: passedArgs })
        this.modals.push(modal)
        return new Promise<T>((resolve, reject) => {
            let message = `presenting ${modal.constructor.name}`
            if (passedArgs) {
                let passedStr = JSON.stringify(passedArgs)
                if (passedStr.length > 80) {
                    passedStr = passedStr.substr(0, 80) + '...'
                }
                message += ` with passed arguments ${passedStr}`
            }
            this.messages.log(message)
            modal.onDidDismiss()
                .then((it) => resolve(it.data))
                .catch(err => reject(this.messages.error(err)))
            modal.present()
        }).catch(err => this.messages.error(err))
    }

    dismiss<T>(output?: T): Promise<T> {
        const modal = this.modals && this.modals.pop()
        if (modal) {
            let message = `dismissing ${modal.constructor.name}`
            if (output) {
                let returnStr = JSON.stringify(output)
                if (returnStr.length > 80) {
                    returnStr = returnStr.substr(0, 80) + '...'
                }
                message += ` with returned value(s) ${returnStr}`
            }
            this.messages.log(message)
            return modal.dismiss(output)
        }
    }
}
