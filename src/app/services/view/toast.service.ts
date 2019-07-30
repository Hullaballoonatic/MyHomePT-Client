import { Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular'
import { MessageService } from '../utility/message.service'

@Injectable({ providedIn: 'root' })
export class ToastService {
    toast

    constructor(private ctrl: ToastController, private messages: MessageService) {
    }

    async present(message: string, duration: number = 3000, position: 'top' | 'middle' | 'bottom' = 'top'): Promise<void> {
        this.messages.log(message)
        await this.dismiss()
        this.toast = await this.ctrl.create({ message, duration, position })
        return this.toast.present()
    }

    dismiss(): Promise<void> {
        const toast = this.toast
        this.toast = null
        return toast && toast.dismiss()
    }
}

