import { Injectable } from '@angular/core'
import moment from 'moment'
import { Message } from '../../models/message'

@Injectable({ providedIn: 'root' })
export class MessageService {
    public messages: Message[] = []
    public errors: Message[] = []

    log(message: string, category?: string, ignoreTimestamp: boolean = false): string {
        if (this.messages.length && !ignoreTimestamp) {
            const now = moment()
            for (const msg of this.messages) {
                if (msg.timestamp.diff(now) >= 1000) {
                    break
                } else if (msg.equiv(message)) {
                    return message
                }
            }
        }
        this.messages.unshift(new Message(message, category))
        return message
    }

    clear() {
        this.messages = []
    }

    pluralize(noun: string, count: number) {
        return count === 1 ? noun : noun + 's'
    }

    error(err: any, category?: string): any {
        console.error(err)
        return err
        /*
        this.errors.push(err)
        this.log(err.message)
        this.toastCtrl.create({
            message: err.message,
            durationString: 6000,
            position: 'top',
        }).then(it => {
            it.present()
            return err
        })
        */
    }
}
