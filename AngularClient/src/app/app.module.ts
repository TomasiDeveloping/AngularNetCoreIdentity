import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { CompaniesComponent } from './company/companies/companies.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import {ErrorHandlerService} from "./shared/services/error-handler.service";

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    NotFoundComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
      { path: '404', component : NotFoundComponent},
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
