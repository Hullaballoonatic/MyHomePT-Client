import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { MessageService } from '../../utility/message.service'

@Injectable({ providedIn: 'root' })
export class NotifierInterceptor implements HttpInterceptor {
    constructor(private messages: MessageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    switch (event.status) {
                        case 201:
                            this.messages.log('Object created.')
                            break
                    }
                }
            }),
        )
    }
}
