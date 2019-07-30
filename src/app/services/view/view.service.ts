import { Injectable } from '@angular/core'
import { LoadingService } from './loading.service'
import { AlertService } from './alert.service'
import { ModalService } from './modal.service'
import { PickerService } from './picker.service'
import { ToastService } from './toast.service'

@Injectable({ providedIn: 'root' })
export class ViewService {
    constructor(public alert: AlertService,
                public loading: LoadingService,
                public modal: ModalService,
                public picker: PickerService,
                public toast: ToastService) {
    }
}
