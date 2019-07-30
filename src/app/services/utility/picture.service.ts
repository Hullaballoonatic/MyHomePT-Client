import { Injectable } from '@angular/core'
import { Camera } from '@ionic-native/camera/ngx'
import { AppService } from '../app.service'
import { Platform } from '@ionic/angular'

@Injectable({ providedIn: 'root' })
export class PictureService {
    constructor(public camera: Camera, private app: AppService, private platform: Platform) {
    }

    get cameraInstalled(): boolean {
        return this.platform.is('cordova') && Camera['installed']()
    }

    getPicture(size: { width: number, height: number } = { width: 96, height: 96 }, fileInput?: any): Promise<any> {
        return new Promise((resolve) => {
            if (this.cameraInstalled) {
                const options = {
                    destinationType: this.camera.DestinationType.DATA_URL,
                    targetWidth: size.width,
                    targetHeight: size.height,
                }
                this.camera.getPicture(options)
                    .then(data => resolve(`data:image/jpg;base64,${data}`))
                    .catch(err => this.app.error(err))
            } else {
                fileInput && fileInput.click()
            }
        })
    }

    processWebImage(img: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = readerEvent => {
                if (readerEvent.target) {
                    resolve((<any> readerEvent.target).result)
                } else {
                    reject()
                }
            }
            reader.readAsDataURL(img)
        })
    }
}
