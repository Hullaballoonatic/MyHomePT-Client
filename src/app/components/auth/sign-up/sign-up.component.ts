import { Component, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidationService } from '../../../services/utility/validation.service'
import { AppService } from '../../../services/app.service'
import { get } from 'lodash'
import { AuthService } from '../../../services/http/auth.service'

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: [ './sign-up.component.scss' ],
})
export class SignUpModal implements OnInit {
    autologin = this.app.settings.autologin || false
    form: FormGroup

    constructor(public app: AppService, private auth: AuthService, private zone: NgZone, private fb: FormBuilder, private validation: ValidationService) {
    }

    toggleAutologin() {
        this.app.settings.toggle('autologin')
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: this.fb.group({
                given: [ get(this.app.credentials, [ 'name', 'given' ], ''), Validators.required ],
                family: [ get(this.app.credentials, [ 'name', 'family' ], ''), Validators.required ],
            }),
            email: [ get(this.app.credentials, [ 'email' ], ''), Validators.compose([ Validators.required, Validators.email ]) ],
            password: [ get(this.app.credentials, [ 'password' ], ''),
                        Validators.compose([ Validators.required, Validators.minLength(6) ]) ],
            repeated: [ '', Validators.required ],
        }, this.validation.passwordMatcher)
    }

    submit(): void {
        this.auth.auth(this.form.value)
            .then(res => {
                this.zone.run(() => this.app.view.modal.dismiss(res))
            })
            .catch(() => this.app.view.toast.present('Email already in use.', 5000, 'bottom'))
        // todo: show errors
    }
}
