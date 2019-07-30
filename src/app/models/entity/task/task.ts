import { SetResult } from './set-result'
import { BaseType } from '../../types'
import { Period } from './period'
import { Frequency } from './frequency'

export interface Task extends BaseType {
    issuerId?: any
    targetId?: any
    exerciseId?: any
    title?: string
    holdTime?: Period
    numReps?: number
    numSets?: number
    frequency?: Frequency
    completeBy?: Date
    details?: string
    setRecordings?: SetResult[]
}
