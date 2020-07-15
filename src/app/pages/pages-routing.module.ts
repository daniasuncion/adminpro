import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";



const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path : 'dashboard', component: DashboardComponent },
            { path : 'dashboard/progress', component: ProgressComponent },
            { path : 'dashboard/graficas1', component: Graficas1Component },
            { path : 'dashboard/account-settings', component: AccountSettingsComponent },
            { path : '', redirectTo: '/dashboard', pathMatch: 'full' },

        ]
    }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class PagesRoutingModule { }
