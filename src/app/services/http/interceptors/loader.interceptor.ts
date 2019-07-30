import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { LoadingController } from '@ionic/angular'

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {
    loading

    constructor(loadingCtrl: LoadingController) {
        loadingCtrl.create({ message: 'Awaiting server...', duration: 10000 }).then(it => this.loading = it)
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loading && this.loading.present()
        return next.handle(req).pipe(finalize(this.loading && this.loading.dismiss))
    }
}
