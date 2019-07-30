import { Injectable } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { MessageService } from '../utility/message.service'

@Injectable({ providedIn: 'root' })
export class AlertService {
    alert

    constructor(private ctrl: AlertController, private messages: MessageService) {
    }

    confirm(message: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.ctrl.create({
                header: 'Confirm',
                message,
                buttons: [
                    { text: 'Agree', handler: () => resolve(true) },
                    { text: 'Cancel', role: 'cancel', handler: () => resolve(false) },
                ],
            })
                .then(it => {
                    this.alert = it
                    it.present()
                        .catch(err => reject(this.messages.error(err)))
                })
                .catch(err => this.messages.error(err))
        })
    }

    present(header: string = 'Alert', subHeader: string = '', buttons: any[] = [ 'OK' ]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ctrl.create({ header, subHeader, buttons })
                .then(alert => {
                    this.alert = alert
                    alert.onDidDismiss()
                        .then(() => resolve())
                        .catch(err => reject(this.messages.error(err)))
                    alert.present().catch(err => this.messages.error(err))
                })
                .catch(err => this.messages.error(err))
        })
    }

    dismiss(): Promise<void> {
        if (this.alert) {
            return this.alert.dismiss()
        }
    }
}
