import moment, { Moment } from 'moment'

export class Message {
    constructor(readonly message: string, readonly category?: string, readonly timestamp: Moment = moment()) {
        console.log(message)
    }

    equiv(that: string): boolean {
        return this.message === that
    }
}
