import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TokenService } from '../../utility/token.service'

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthHeader(req))
    }

    private addAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
        return req.clone({
            headers: req.headers.set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token.signature}`),
        })
    }
}
