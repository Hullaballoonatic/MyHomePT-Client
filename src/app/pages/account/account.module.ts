import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { AccountPage } from './account.page'
import { UserFormModal } from '../../components/user/form/user-form.component'
import { SecurityModal } from '../../components/user/security/security.component'
import { SharedModule, ToolbarModule } from 'primeng/primeng'

const routes: Routes = [
    {
        path: '',
        component: AccountPage,
    },
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule,
        ToolbarModule,
    ],
    declarations: [ AccountPage, UserFormModal, SecurityModal ],
    entryComponents: [ UserFormModal, SecurityModal ],
})
export class AccountPageModule {
}
