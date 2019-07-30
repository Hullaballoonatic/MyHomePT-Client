import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'


const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            { path: 'account', loadChildren: '../account/account.module#AccountPageModule' },
            { path: 'tasks', loadChildren: '../tasks/tasks.module#TasksPageModule' },
            { path: 'therapist', loadChildren: '../therapist/therapist.module#TherapistPageModule' },
            { path: 'dev', loadChildren: '../dev/dev.module#DevPageModule' },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/account',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class TabsRoutingModule {
}
