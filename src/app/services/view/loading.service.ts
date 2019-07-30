import { Injectable } from '@angular/core'
import { LoadingController } from '@ionic/angular'
import { MessageService } from '../utility/message.service'
import moment from 'moment'

@Injectable({ providedIn: 'root' })
export class LoadingService {
    loading = []

    constructor(private ctrl: LoadingController, private messages: MessageService) {
    }

    present(message: string = 'Please wait...', duration: number = 10000): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ctrl.create({ message, duration })
                .then(loading => {
                    this.loading.push(loading)
                    let str = `presenting loading with message ${message}`
                    if (duration) {
                        str += ` for ${moment.duration(duration, 'ms').humanize()}.`
                    }
                    this.messages.log(str)
                    loading.present().then(resolve).catch(err => reject(this.messages.error(err)))
                })
                .catch(err => this.messages.error(err))
        })
    }

    dismiss(): Promise<void> {
        const loading = this.loading && this.loading.pop()
        if (loading) {
            this.messages.log('dismissing loading.')
            return loading.dismiss()
        }
    }
}
