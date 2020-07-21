import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NopagefoundComponent} from "./shared/nopagefound/nopagefound.component";
import {PagesRoutingModule} from "./pages/pages-routing.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";


const routes: Routes = [
    { path: '**', component: NopagefoundComponent },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            PagesRoutingModule,
            AuthRoutingModule,
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
