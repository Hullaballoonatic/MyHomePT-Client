import { Component } from '@angular/core'
import { SignUpModal } from 'src/app/components/auth/sign-up/sign-up.component'
import { AppService } from 'src/app/services/app.service'
import { SignInModal } from '../../components/auth/sign-in/sign-in.component'
import { User } from '../../models/entity/user/user'

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.page.html',
    styleUrls: [ 'welcome.page.scss' ],
})
export class WelcomePage {
    constructor(private app: AppService) {
    }

    signin() {
        this.auth(SignInModal)
    }

    signup() {
        this.auth(SignUpModal)
    }

    private auth(component) {
        this.app.view.modal.present<User>(component)
            .then(it => it && this.app.navigate('home'))
    }
}
