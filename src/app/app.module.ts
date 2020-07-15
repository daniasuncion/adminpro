import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//rutas
import { AppRoutingModule } from './app-routing.module';
//components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
//Modulos
import {PagesModule} from "./pages/pages.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {FormsModule} from "@angular/forms";
//Servicios
import {SettingsService} from "./services/settings.service";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
      AppComponent,
      // LoginComponent,
      // RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    PagesModule,
		AuthModule,
		FormsModule
	],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
