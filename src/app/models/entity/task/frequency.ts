import { Period, toPeriodStr } from './period'
import { PickerColumnOption } from '@ionic/core/dist/types/interface'

export interface Frequency {
    times?: number
    period?: Period
}

export function toFreqStr(v: Frequency): string {
    if (v) {
        let str = ''
        if (v.times === 1) {
            str += 'once '
        } else if (v.times === 2) {
            str += 'twice '
        } else {
            str += `${v.times} times `
        }
        return str + `every ${toPeriodStr(v.period)}`
    }
}

export const TimeUnitSymbols = [ 's', 'm', 'h', 'd', 'w', 'M', 'y' ]
export const TimeUnitAbbrs = [ 'sec', 'min', 'hour', 'day', 'week', 'mon', 'year' ]

export const TimeUnitOptions: PickerColumnOption[] = TimeUnitAbbrs.map((abbr, i) => {
    return { text: abbr, value: TimeUnitSymbols[i] }
})
