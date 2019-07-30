import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { TabsPage } from './tabs.page'
import { TasksPageModule } from '../tasks/tasks.module'
import { TabsRoutingModule } from './tabs-routing.module'
import { AccountPageModule } from '../account/account.module'
import { TherapistPageModule } from '../therapist/therapist.module'
import { DevPageModule } from '../dev/dev.module'


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsRoutingModule,
        TasksPageModule,
        AccountPageModule,
        TherapistPageModule,
        DevPageModule,
    ],
    declarations: [ TabsPage ],
})
export class TabsPageModule {
}
