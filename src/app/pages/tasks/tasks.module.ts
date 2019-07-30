import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'

import { TasksPage } from './tasks.page'
import { TaskComponent } from '../../components/task/task.component'
import { CardModule, SharedModule, ToolbarModule } from 'primeng/primeng'
import { ActiveTaskComponent } from '../../components/task/active/active.component'


const routes: Routes = [
    {
        path: '',
        component: TasksPage,
    },
]

@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ToolbarModule,
        CardModule,
    ],
    declarations: [
        TasksPage,
        TaskComponent,
        ActiveTaskComponent,
    ],
    entryComponents: [
        TaskComponent,
    ],
    exports: [
        TasksPage,
    ],
})
export class TasksPageModule {
}
