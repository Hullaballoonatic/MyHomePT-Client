import { Injectable } from '@angular/core'
import { BLE } from '@ionic-native/ble/ngx'
import { Flexdot } from '../../models/flexdot'
import { ToastService } from '../view/toast.service'
import { StorageService } from '../utility/files/storage.service'
import { MessageService } from '../utility/message.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class FlexdotService {
    constructor(private ble: BLE,
                private toast: ToastService,
                private messages: MessageService,
                private storage: StorageService) {
    }

    private _flexdots: BehaviorSubject<Flexdot[]> = new BehaviorSubject((this.storage.flexdotIds && this.storage.flexdotIds.map(fd => new Flexdot(fd))) || [])

    public get flexdots(): Flexdot[] {
        return this._flexdots.value
    }

    public get isEmpty(): boolean {
        return this.flexdots.length === 0
    }

    private _flexdots$: Observable<Flexdot[]> = this._flexdots.asObservable()

    public get flexdots$(): Observable<Flexdot[]> {
        return this._flexdots$
    }

    public report(): void {
        this.log(`num flexdots = ${this.flexdots.length}`)
    }

    flashBatteryLevel(flexdot: Flexdot) {
        const level = new Uint8Array(Buffer.from(Math.round(Math.round(flexdot.batteryLevel) * 255).toString(16), 'hex'))
        // TODO: send this to the right place to flash the battery level... also, other stuff like light brightness, flash time, etc...
    }

    search(): Observable<Flexdot> {
        this.log('scanning for Flexdots.')
        const newDots = new BehaviorSubject<Flexdot>(null)
        this.ble.scan([ Flexdot.uuids.service ], 6).pipe(map(it => new Flexdot(it)))
            .subscribe(
                fd => {
                    if (this.add(fd)) {
                        newDots.next(fd)
                    }
                },
                err => this.onError(err),
            )
        return newDots.asObservable()
    }

    startSearching(): Observable<Flexdot> {
        this.log('scanning for Flexdots.')
        const newDots = new BehaviorSubject<Flexdot>(null)
        this.ble.startScan([ Flexdot.uuids.service ]).pipe(map(it => new Flexdot(it.id)))
            .subscribe(
                fd => {
                    if (this.add(fd)) {
                        newDots.next(fd)
                    }
                },
                err => this.onError(err),
            )
        return newDots.asObservable()
    }

    stopSearching() {
        this.ble.stopScan()
    }

    startListening(...flexdots: Flexdot[]): void {
        this.someOrAll((it: Flexdot) => {
            this.log(`Listening to Flexdot #${it.id}.`)
            this.ble.startNotification(it.id, Flexdot.uuids.service, Flexdot.uuids.emg).subscribe(reading => it.next(reading))
        }, flexdots)
    }

    stopListening(...flexdots: Flexdot[]): void {
        this.someOrAll((it: Flexdot) => {
            this.log(`No longer listening to Flexdot #${it.id}.`)
            this.ble.stopNotification(it.id, Flexdot.uuids.service, Flexdot.uuids.emg).catch(err => this.onError(err))
        }, flexdots)
    }

    initialize(): void {
        if (this.flexdots) {
            this.flexdots.forEach(it => this.autoConnect(it))
        }
    }

    autoConnect(flexdot: Flexdot) {
        this.log(`Establishing auto-connection to flexdot #${flexdot.id}`)
        this.ble.autoConnect(
            flexdot.id,
            () => {
                this.toast.present(`Connected to Flexdot #${flexdot.id}!`)
                flexdot.isConnected = true
            },
            () => {
                this.toast.present(`Lost Flexdot ${flexdot.id}`)
                flexdot.isConnected = false
            })
    }

    connect(flexdot: Flexdot) {
        this.ble.connect(flexdot.id).subscribe(
            () => {
                this.toast.present(`Connected to Flexdot #${flexdot.id}!`)
                flexdot.isConnected = true
            },
            () => {
                this.toast.present(`Connection Failed on Flexdot ${flexdot.id}`)
                flexdot.isConnected = false
                if (flexdot.canTryReconnect()) {
                    this.toast.present(`Reconnect Attempt #${flexdot.numReconnectionAttempts}`)
                    this.connect(flexdot)
                } else {
                    this.disconnect(flexdot)
                }
            },
        )
    }

    disconnect(...flexdots: Flexdot[]) {
        this.someOrAll((it: Flexdot) => {
            this.ble.disconnect(it.id)
                .then(() => {
                    this.log(`Intentionally disconnected from Flexdot #${it.id}`)
                })
                .catch(err => this.onError(err))
        }, flexdots)
    }

    public add(v: Flexdot): boolean {
        const dots = this.flexdots
        if (!dots.find(it => it.id === v.id)) {
            this.log(`adding ${v.id}!`)
            dots.push(v)
            this._flexdots.next(dots)
            this.storage.flexdotIds = dots.map(it => it.id)
            return true
        } else {
            return false
        }
    }

    public remove(v: Flexdot): boolean {
        const dots = this.flexdots
        if (dots.find(it => it.id === v.id)) {
            this.log(`removing ${v.id}`)
            dots.splice(dots.indexOf(v), 1)
            this._flexdots.next(dots)
            this.storage.flexdotIds = dots.map(it => it.id)
            return true
        } else {
            return false
        }
    }

    private someOrAll<T>(fun: (Flexdot) => T, flexdots: Flexdot[]): T[] {
        if (!flexdots.length) {
            flexdots = this.flexdots
        }
        return flexdots && flexdots.map(fun)
    }

    private log(message: string): void {
        this.messages.log(message, 'Flexdot')
    }

    private onError(err: any): any {
        this.messages.error(err, 'Flexdot')
        return err
    }
}
