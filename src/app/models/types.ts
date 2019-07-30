import { Name } from './entity/user/name'

export interface BaseType {
    _id?: any
    createdOn?: Date
    updatedOn?: Date
    picture?: any
}

export interface Credentials {
    name?: Name
    email?: string
    password?: string
}

export interface Country {
    code: string
    iso2: string
    iso3: string
    name: string
}

export interface JWT {
    signature: string
    iat: number
    exp: number
}
