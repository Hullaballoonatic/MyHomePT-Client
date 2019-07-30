import { Component } from '@angular/core'
import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { AppService } from './services/app.service'
import { UserService } from './services/http/entities/user.service'
import { FlexdotService } from './services/bluetooth/flexdot.service'
import { LoadingService } from './services/view/loading.service'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private app: AppService,
                private loading: LoadingService,
                private fd: FlexdotService,
                private users: UserService) {
        this.initializeApp()
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                this.statusBar.styleDefault()
                this.splashScreen.hide()
            }
            this.fd.initialize()
            if (this.app.settings.autologin && this.app.curUser) {
                this.loading.present('Logging you in...')
                this.users.curUser
                    .subscribe(
                        res => this.app.navigate(res ? 'home' : 'welcome'),
                        err => this.app.error(err),
                        () => this.loading.dismiss(),
                    )
            }
        })
    }
}
