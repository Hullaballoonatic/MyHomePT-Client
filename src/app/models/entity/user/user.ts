import { Name } from './name'
import { PhoneNumber } from 'libphonenumber-js'
import { BaseType } from '../../types'
import { Address } from './address'
import { Sex } from './sex'

export interface User extends BaseType {
    signedInOn?: Date
    signedOutOn?: Date
    email?: string
    name?: Name
    patientIds?: string[]
    therapistIds?: string[]
    taskIds?: string[]
    createdExerciseIds?: string[]
    address?: Address
    phoneNumber?: PhoneNumber
    sex?: Sex
    birthday?: Date
    privilege?: number
}
