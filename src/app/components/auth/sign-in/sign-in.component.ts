import { Component, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AppService } from '../../../services/app.service'
import { get } from 'lodash'
import { AuthService } from '../../../services/http/auth.service'

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ],
})
export class SignInModal implements OnInit {
    autologin: boolean = this.app.settings.autologin || false
    form: FormGroup

    constructor(private app: AppService, private zone: NgZone, private auth: AuthService, private fb: FormBuilder) {
    }

    toggleAutologin() {
        this.app.settings.toggle('autologin')
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: [ get(this.app.credentials, 'email'), Validators.compose([ Validators.required, Validators.email ]) ],
            password: [ get(this.app.credentials, 'password'), Validators.compose([ Validators.required ]) ],
        })
    }

    submit(): void {
        this.auth.auth(this.form.value)
            .then(res => {
                this.zone.run(() => this.app.view.modal.dismiss(res))
            })
            .catch(() => this.app.view.toast.present('Email or Password is incorrect.', 5000, 'bottom'))
        // todo: show user-pertinent errors
    }
}
