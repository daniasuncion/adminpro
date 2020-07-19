import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {PromesasComponent} from "./promesas/promesas.component";
import {RxjsComponent} from "./rxjs/rxjs.component";
import {AuthGuard} from "../guards/auth.guard";



const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
				canActivate: [AuthGuard],
        children: [
            { path : 'dashboard', component: DashboardComponent, data: {titulo:'Dashboard'} },
            { path : 'dashboard/progress', component: ProgressComponent, data: {titulo:'Progreso'} },
            { path : 'dashboard/graficas1', component: Graficas1Component, data: {titulo:'Graficas'} },
            { path : 'dashboard/account-settings', component: AccountSettingsComponent, data: {titulo:'Ajustes de la Cuenta'} },
            { path : 'dashboard/promesas', component: PromesasComponent, data: {titulo:'Promesas'} },
            { path : 'dashboard/rxjs', component: RxjsComponent, data: {titulo:'RxJS'} },
            { path : '', redirectTo: '/dashboard', pathMatch: 'full' },

        ]
    }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class PagesRoutingModule { }
