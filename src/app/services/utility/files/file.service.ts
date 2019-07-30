import { Injectable } from '@angular/core'
import { StorageService } from './storage.service'
import { Observable } from 'rxjs'
import { MessageService } from '../message.service'
import { ViewService } from '../../view/view.service'

/**
 * XML file upload service. Probably not the right thing...
 */
@Injectable({ providedIn: 'root' })
export class FileService {
    private progress = 0
    private progressObserver
    private progress$: Observable<number> = new Observable(observer => {
        this.progressObserver = observer
        this.progressObserver.subscribe(next => this.progress = next, err => this.messages.error(err))
    })

    constructor(private view: ViewService, public storage: StorageService, private messages: MessageService) {
    }

    public get observer() {
        return this.progress$
    }

    public process(file, onLoaded: (any?) => any = (readerEvent) => this.messages.log(JSON.stringify(readerEvent))) {
        const reader = new FileReader()

        this.setUploadUpdateInterval(500)

        reader.onprogress = event => {
            this.progressObserver && this.progressObserver
                .next(100 * event.loaded / event.total)
        }

        reader.onload = onLoaded

        reader.readAsDataURL(file)
    }

    public upload(url: string, files: File[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.view.loading.present()
            const data = new FormData()
            const xhr = new XMLHttpRequest()

            files.forEach(file => data.append('uploads[]', file, file.name))

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    this.view.loading.dismiss()
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response))
                    } else {
                        reject(xhr.response)
                    }
                }
            }

            this.setUploadUpdateInterval(500)

            xhr.upload.onprogress = (event) => {
                this.progressObserver && this.progressObserver.next(100 * event.loaded / event.total)
            }

            xhr.open('POST', url, true)
            xhr.send(data)
        })
    }

    private setUploadUpdateInterval(interval: number) {
        setInterval(() => {
        }, interval)
    }
}
