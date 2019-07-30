import { Injectable } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

@Injectable({ providedIn: 'root' })
export class ValidationService {
    public passwordMatcher(ac: AbstractControl) {
        const password = ac.get('password')
        const repeated = ac.get('repeated')
        if (password.value !== repeated.value) {
            repeated.setErrors({ matchPassword: true })
        } else {
            return null
        }
    }

    public phoneNumberValidator(ac: AbstractControl) {
        const country = ac.value.address.value && ac.value.address.value.country && ac.value.address.value.country.iso2
        const phoneNumber = parsePhoneNumberFromString(ac.value.phoneNumber, country)
        if (phoneNumber) {
            if (!phoneNumber.isValid()) {
                ac.setErrors({ numberInvalid: true })
                return
            } else {
                ac.patchValue({ phoneNumber: phoneNumber })
            }
        }
        return null
    }
}
