import { BaseType } from '../../types'
import exercises from 'src/assets/json/exercises.json'

export const defaultExercises: Exercise[] = exercises

export interface Exercise extends BaseType {
    creatorId?: any
    bodyPart?: string
    title?: string
    link?: String
    description?: string
    videoUrl?: string
}
