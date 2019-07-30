export interface Period {
    amount?: number
    unit?: string
}

export function toPeriodStr(v: Period): string {
    if (v) {
        let unitStr
        if (v.unit === 's') {
            unitStr = 'second'
        } else if (v.unit === 'm') {
            unitStr = 'minute'
        } else if (v.unit === 'h') {
            unitStr = 'hour'
        } else if (v.unit === 'd') {
            unitStr = 'day'
        } else if (v.unit === 'w') {
            unitStr = 'week'
        } else if (v.unit === 'M') {
            unitStr = 'month'
        } else {
            unitStr = 'year'
        }
        let str = v.amount + ' ' + unitStr
        if (v.amount > 1) {
            str += 's'
        }
        return str
    }
}


