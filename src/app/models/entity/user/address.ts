import { Country } from '../../types'

export interface Address {
    address?: string
    city?: string
    country?: Country
    postalCode?: string
    region?: string
}
