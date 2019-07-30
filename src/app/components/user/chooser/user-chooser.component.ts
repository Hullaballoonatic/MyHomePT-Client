import { Component, Input } from '@angular/core'
import { EntityChooser } from '../../../models/entity/entity-chooser'
import { User } from '../../../models/entity/user/user'
import { AppService } from '../../../services/app.service'
import { UserService } from '../../../services/http/entities/user.service'

@Component({
    selector: 'app-user-chooser',
    templateUrl: './user-chooser.component.html',
    styleUrls: [ './user-chooser.component.scss' ],
})
export class UserChooser extends EntityChooser<User> {
    @Input() choices: User[]

    constructor(private app: AppService, service: UserService) {
        super(service)
    }

    submit(): void {
        this.app.view.modal.dismiss(this.selected[0])
    }

    dismiss(): void {
        this.app.view.modal.dismiss()
    }

    click(user: User): void {
        if (this.selected.includes(user)) {
            this.deselect(user)
        } else {
            this.select(user)
        }
    }
}
