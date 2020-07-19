import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
//components
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
	],
	exports: [
		LoginComponent,
		RegisterComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	]
})
export class AuthModule {}