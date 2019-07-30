import { Component } from '@angular/core'
import { UserService } from '../../services/http/entities/user.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: [ './tabs.page.scss' ],
})
export class TabsPage {
    devTabEnabled$: Observable<boolean> = this.userService.curUser.pipe(map(it => it.privilege >= 100))
    therapistTabEnabled$: Observable<boolean> = this.userService.curUser.pipe(map(it => it.privilege >= 50))

    constructor(private userService: UserService) {
    }
}
