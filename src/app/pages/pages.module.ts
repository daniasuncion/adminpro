import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {PagesComponent} from "./pages.component";

import {SharedModule} from "../shared/shared.module";
import {PagesRoutingModule} from "./pages-routing.module";

import {IncrementadorComponent} from "../components/incrementador/incrementador.component";
import {ChartsModule} from "ng2-charts";
import {GraficoDonaComponent} from "../components/grafico-dona/grafico-dona.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [
			PagesComponent,
			DashboardComponent,
			ProgressComponent,
			Graficas1Component,
			IncrementadorComponent,
			GraficoDonaComponent,
			AccountSettingsComponent,
			PromesasComponent,
			RxjsComponent,
			PerfilComponent
    ],
    exports: [
			DashboardComponent,
			ProgressComponent,
			Graficas1Component,
    ],
    imports: [
			SharedModule,
			PagesRoutingModule,
			FormsModule,
			ChartsModule,
			ReactiveFormsModule,
			BrowserModule
    ]
})
export class PagesModule {}

