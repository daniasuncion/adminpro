import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//rutas
import { AppRoutingModule } from './app-routing.module';
//components

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//Modulos
import {PagesModule} from "./pages/pages.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
