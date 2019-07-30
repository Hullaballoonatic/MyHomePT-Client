import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'home', redirectTo: 'tabs', pathMatch: 'full' },
    { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
    { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {
}
