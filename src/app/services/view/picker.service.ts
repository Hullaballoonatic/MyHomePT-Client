import { Injectable } from '@angular/core'
import { PickerController } from '@ionic/angular'
import { MessageService } from '../utility/message.service'
import { PickerColumn } from '@ionic/core'
import { mapValues } from 'lodash'

@Injectable({ providedIn: 'root' })
export class PickerService {
    picker

    constructor(private ctrl: PickerController, private messages: MessageService) {
    }

    present<T>(columns: PickerColumn[]): Promise<T> {
        return new Promise((resolve, reject) => {
            this.ctrl.create({
                backdropDismiss: true,
                columns,
                buttons: [
                    { text: 'Cancel', role: 'cancel', handler: reject },
                    { text: 'Accept', handler: res => resolve(mapValues(res, o => o.value)) },
                ],
            })
                .then(picker => {
                    this.messages.log(`presenting ${picker.constructor.name}.`)
                    this.picker = picker
                    picker.present().catch(err => reject(this.messages.error(err)))
                })
                .catch(err => this.messages.error(err))
        })
    }
}
