import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppService } from '../../app.service'

@Injectable({ providedIn: 'root' })
export class ErrorsInterceptor implements HttpInterceptor {
    constructor(private app: AppService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // retry(3),
            catchError((error: HttpErrorResponse) => {
                // todo: individual error handling
                switch (error.status) {
                    case 503:
                        this.app.log('Server is down.')
                        break
                    case 500:
                        this.app.log('Unknown server error.')
                        break
                    case 304:
                        this.app.log('Entity was not modified.')
                        break
                    case 400:
                        this.app.log('The client issued a bad request to the server.')
                        break
                    case 401:
                        this.app.log('Authentication failed. Booting out to welcome screen.')
                        this.app.navigate('welcome')
                        break
                }
                return throwError(error)
            }),
        )
    }
}
