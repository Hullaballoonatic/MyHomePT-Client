import { Component, OnInit } from '@angular/core'
import { AppService } from '../../services/app.service'
import { FlexdotService } from '../../services/bluetooth/flexdot.service'
import { Flexdot } from '../../models/flexdot'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-flexdot',
    templateUrl: './flexdot.component.html',
    styleUrls: [ './flexdot.component.scss' ],
})
export class FlexdotComponent implements OnInit {
    constructor(private app: AppService, private service: FlexdotService) {
    }

    get flexdots$(): Observable<Flexdot[]> {
        return this.service.flexdots$
    }

    get empty(): boolean {
        return this.service.isEmpty
    }

    ngOnInit(): void {
        this.service.startSearching()
    }

    select(flexdot: Flexdot): void {
        this.service.autoConnect(flexdot)
    }

    dismiss(): void {
        this.service.stopSearching()
        this.app.view.modal.dismiss()
    }
}
