import { BehaviorSubject, Observable } from 'rxjs'
import { sum } from 'lodash'

export class Flexdot {
    static deviceName = 'Dynofit Inc Flexdot'
    static uuids = {
        service: '7309203e-349d-4c11-ac6b-baedd1819764',
        emg: 'e5f49879-6ee1-479e-bfec-3d35e13d3b88',
        battery: 'd6b9eb0d-9382-4147-8737-f241ae9fd366',
        led: 'b8637601-a003-436d-a995-2a7f20bcb3d4',
    }
    static batteryMaxVolts: number = 3.0
    static maxReconnectionAttempts: number = 5
    numReconnectionAttempts: number = 0
    public emgReadings: number[] = []
    private connectionState: BehaviorSubject<boolean> = new BehaviorSubject(false)
    private emgReading: BehaviorSubject<number> = new BehaviorSubject(null)

    constructor(readonly id: string) {
        this.connectionState$.subscribe(isConnected => {
            if (isConnected) {
                this.numReconnectionAttempts = 0
            } else {
                this.numReconnectionAttempts++
            }
        })
    }

    public get emgReading$(): Observable<number> {
        return this.emgReading.asObservable()
    }

    public get isConnected(): boolean {
        return this.connectionState.value
    }

    public set isConnected(v: boolean) {
        this.connectionState.next(v)
    }

    public get connectionState$(): Observable<boolean> {
        return this.connectionState.asObservable()
    }

    private _batteryLevel = 0.0

    get batteryLevel(): number {
        return this._batteryLevel
    }

    set batteryLevel(v: number) {
        if (v !== 32768 && v !== -1) {
            this._batteryLevel = (v / Flexdot.batteryMaxVolts)
        }
    }

    canTryReconnect() {
        return this.numReconnectionAttempts < Flexdot.maxReconnectionAttempts
    }

    clearReadings() {
        this.emgReadings = []
    }

    next(reading): number {
        const arr = new Uint16Array(reading)
        const datum: number = Math.round(sum(arr.subarray(0, 6)) / 7)
        const seqNum: number = arr[7] + arr[8]
        this.batteryLevel = arr[9]
        this.emgReadings[seqNum] = datum
        this.emgReading.next(datum)
        return datum
    }
}
