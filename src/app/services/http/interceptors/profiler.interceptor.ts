import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { MessageService } from '../../utility/message.service'
import { finalize, tap } from 'rxjs/operators'
import moment from 'moment'

@Injectable({ providedIn: 'root' })
export class ProfilerInterceptor implements HttpInterceptor {
    constructor(private messages: MessageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now()
        let ok: string = ''
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        ok = 'succeeded'
                    }
                },
                () => ok = 'failed',
            ),
            finalize(() => {
                this.messages.log(`${req.method} "${req.urlWithParams}" ${ok} in ${moment.duration(Date.now() - started, 'ms').humanize()}`)
            }),
        )
    }
}
