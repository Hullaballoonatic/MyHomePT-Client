import { Component } from '@angular/core'
import { AppService } from '../../../services/app.service'

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrls: [ './security.component.scss' ],
})
export class SecurityModal {
    isValid = false // todo: security modal

    constructor(private app: AppService) {
    }

    async submit() {

    }

    async dismiss() {
        this.app.view.modal.dismiss()
    }
}
