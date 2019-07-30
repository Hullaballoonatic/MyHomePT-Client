import { Component, Input, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ValidationService } from '../../../services/utility/validation.service'
import { User } from '../../../models/entity/user/user'
import { AppService } from '../../../services/app.service'
import { PictureService } from '../../../services/utility/picture.service'
import { compact, get } from 'lodash'
import { EntityFormModal } from '../../../models/entity/entity-form-modal'
import sexes from 'src/assets/json/sexes.json'
import countries from 'src/assets/json/countries.json'
import moment from 'moment'
import { UserService } from '../../../services/http/entities/user.service'
import { Country } from '../../../models/types'

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: [ './user-form.component.scss' ],
})
export class UserFormModal extends EntityFormModal<User> {
    @Input() existingEntity: User = this.app.curUser
    @ViewChild('fileInput') fileInput: { nativeElement: { click: () => void } }
    today: string
    nameExpanded: boolean
    addressExpanded: boolean

    constructor(app: AppService, fb: FormBuilder, service: UserService, private validator: ValidationService, private pictures: PictureService) {
        super(app, fb, service)
    }

    get birthdayISO(): string {
        return this.form.value.birthday && moment(this.form.value.birthday).toISOString()
    }

    get countryName(): string {
        return get(this.form.controls.address.value, [ 'country', 'name' ])
    }

    get sexName(): string {
        return get(this.form.controls.sex.value, [ 'geneExpression', 'name' ])
    }

    get addressString(): string {
        const addr = this.form.controls.address.value
        const start = compact([ addr.address, addr.city, addr.region, this.countryName ]).join(', ')
        const end = addr.postalCode ? ` ${addr.postalCode}` : ''
        return start + end
    }

    pickSex(): void {
        this.app.view.picker.present<string>([ {
            name: 'Sex',
            options: sexes.map(sex => {
                return { text: `${sex.expr} (${sex.name})`, value: sex, selected: sex.name === this.sexName }
            }),
        } ]).then(res => {
            this.form.controls.sex.markAsDirty()
            this.form.controls.sex.patchValue({ geneExpression: res })
        })
    }

    pickCountry(): void {
        this.app.view.picker.present<Country>([ {
            name: 'Country',
            options: countries.map(country => {
                return { text: country.name, value: country, selected: country.name === this.countryName }
            }),
        } ]).then(res => {
            this.form.controls.address.markAsDirty()
            this.form.controls.address.patchValue({ country: res })
        })
    }

    ngOnInit() {
        super.ngOnInit()
        this.today = moment().toISOString()
        this.nameExpanded = false
        this.addressExpanded = false
    }

    getPicture() {
        this.pictures.getPicture({ width: 96, height: 96 }, this.fileInput.nativeElement)
            .then(data => this.form.patchValue({ picture: `data:image/jpg;base64,${data}` }))
    }

    onFileReceived(event) {
        this.pictures.processWebImage(event.target.files[0]).then(picture => this.form.patchValue({ picture }))
    }

    buildForm(): void {
        this.form = this.fb.group({
            name: this.fb.group({
                given: [ get(this.existingEntity, [ 'name', 'given' ]) ],
                family: [ get(this.existingEntity, [ 'name', 'family' ]) ],
                display: [ get(this.existingEntity, [ 'name', 'display' ]) ],
                prefix: [ get(this.existingEntity, [ 'name', 'prefix' ]) ],
                middle: [ get(this.existingEntity, [ 'name', 'middle' ]) ],
                suffix: [ get(this.existingEntity, [ 'name', 'suffix' ]) ],
            }),
            phoneNumber: [ get(this.existingEntity, [ 'phoneNumber' ]) ],
            address: this.fb.group({
                address: [ get(this.existingEntity, [ 'address', 'address' ]) ],
                city: [ get(this.existingEntity, [ 'address', 'city' ]) ],
                country: [ get(this.existingEntity, [ 'address', 'country' ]), Validators.required ],
                postalCode: [ get(this.existingEntity, [ 'address', 'postalCode' ]) ],
                region: [ get(this.existingEntity, [ 'address', 'region' ]) ],
            }),
            birthday: [ get(this.existingEntity, [ 'birthday' ]) ],
            sex: this.fb.group({
                geneExpression: [ get(this.existingEntity, [ 'sex', 'geneExpression' ]) ],
                gender: [ get(this.existingEntity, [ 'sex', 'gender' ]) ],
            }),
            picture: [ this.existingEntity.picture || '' ],
        }, this.validator.phoneNumberValidator)
    }
}
