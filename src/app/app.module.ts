import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabsPageModule } from './pages/tabs/tabs.module'
import { BLE } from '@ionic-native/ble/ngx'
import { Camera } from '@ionic-native/camera/ngx'

import { AuthInterceptor } from './services/http/interceptors/auth.interceptor'
import { ExerciseFormModal } from './components/exercise/form/exercise-form-modal.component'
import { ExerciseChooser } from './components/exercise/chooser/exercise-chooser.component'
import { UserChooser } from './components/user/chooser/user-chooser.component'
import { LoaderInterceptor } from './services/http/interceptors/loader.interceptor'
import { ProfilerInterceptor } from './services/http/interceptors/profiler.interceptor'
import { ErrorsInterceptor } from './services/http/interceptors/errors.interceptor'
import { NotifierInterceptor } from './services/http/interceptors/notifier.interceptor'
import { SignInModal } from './components/auth/sign-in/sign-in.component'
import { SignUpModal } from './components/auth/sign-up/sign-up.component'
import { TaskFormModal } from './components/task/form/task-form.component'
import { FlexdotComponent } from './components/flexdot/flexdot.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CardModule, SharedModule, ToolbarModule } from 'primeng/primeng'

@NgModule({
    declarations: [
        SignInModal,
        SignUpModal,
        AppComponent,
        UserChooser,
        ExerciseChooser,
        ExerciseFormModal,
        FlexdotComponent,
        TaskFormModal,
    ],
    entryComponents: [
        SignInModal,
        SignUpModal,
        UserChooser,
        ExerciseChooser,
        ExerciseFormModal,
        FlexdotComponent,
        TaskFormModal,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        TabsPageModule,
        BrowserAnimationsModule,
        SharedModule,
        ToolbarModule,
        CardModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BLE,
        Camera,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NotifierInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ProfilerInterceptor, multi: true },
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
