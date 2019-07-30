import { BehaviorSubject, interval, Observable } from 'rxjs'
import moment, { duration, Duration, Moment } from 'moment'
import { Flexdot } from './flexdot'
import { SetResult } from './entity/task/set-result'
import { compact, mean } from 'lodash'
import { map } from 'rxjs/operators'

export class ReadingAggregator {
    private collection: number[] = []
    private _reading: number
    private readingSubject: BehaviorSubject<number> = new BehaviorSubject(null)
    private timer = interval(this.period)
    private timeSub
    private flexdotSubs
    private startTime: Moment
    private completeTime: Moment
    private durationSubject: BehaviorSubject<number> = new BehaviorSubject(this.completeTime.valueOf() || 0 - this.startTime.valueOf() || 0)

    constructor(public flexdots: Flexdot[], lastRecording?: SetResult, private period: number = 1000) {
        if (lastRecording) {
            this.startTime = lastRecording.startedOn && moment(lastRecording.startedOn)
            this.completeTime = lastRecording.completedOn && moment(lastRecording.completedOn)
            this._readings = lastRecording.recording || []
        }
    }

    public get duration(): Duration {
        return duration(this.durationSubject.value * this.period)
    }

    private _readings: number[] = []

    public get readings(): number[] {
        return this._readings
    }

    private _reading$: Observable<number> = this.readingSubject.asObservable()

    public get reading$(): Observable<number> {
        return this._reading$
    }

    private _duration$: Observable<Duration> = this.durationSubject.asObservable().pipe(map(it => duration(it * this.period)))

    public get duration$(): Observable<Duration> {
        return this._duration$
    }

    public get result(): SetResult {
        return {
            startedOn: this.startTime.toDate(),
            completedOn: this.completeTime.toDate(),
            recording: compact(this.readings),
        }
    }

    get score(): number {
        return Math.round(mean(compact(this.readings)))
    }

    get recentSummary(): { durationStr: string, score: number } {
        const duration = this.duration
        return {
            durationStr: `${duration.seconds()}.${duration.milliseconds()}s`,
            score: this.score,
        }
    }

    public stop(): void {
        this.completeTime = moment()
        this.flexdotSubs && this.flexdotSubs.forEach(it => it.unsubscribe())
        this.timeSub && this.timeSub.unsubscribe()
    }

    public start(flexdots = this.flexdots): void {
        this.clear()
        this.flexdotSubs = flexdots.map(it => it.emgReading$.subscribe(reading => this.collection.push(reading)))
        this.startTime = moment()
        this.resume()
    }

    public pause(): void {
        this.timeSub.unsubscribe()
    }

    public resume(): void {
        this.timeSub = this.timer.subscribe(() => this.aggregate())
    }

    public clear(): void {
        this._readings = []
    }

    private aggregate(): void {
        this.durationSubject.next(this.durationSubject.value + 1)
        this._reading = Math.round(mean(this.collection))
        this._readings.push(this._reading)
        this.readingSubject.next(this._reading)
        this.collection = []
    }
}
