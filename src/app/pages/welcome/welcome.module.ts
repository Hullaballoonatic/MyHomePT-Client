import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { WelcomePage } from './welcome.page'

const routes = [
    { path: '', component: WelcomePage },
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ WelcomePage ],
    exports: [ WelcomePage ],
})
export class WelcomePageModule {
}
