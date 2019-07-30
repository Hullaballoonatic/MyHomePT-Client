import { BaseType } from '../../types'
import Inspirations from 'src/assets/json/inspiration.json'

export interface Inspiration extends BaseType {
    message?: string
}

export const defaultInspirations: Inspiration[] = Inspirations
