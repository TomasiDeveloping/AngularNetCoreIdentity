import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {JwtModule} from "@auth0/angular-jwt";

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CompaniesComponent} from './company/companies/companies.component';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {ErrorHandlerService} from "./shared/services/error-handler.service";
import {AuthGuard} from "./shared/guards/auth.guard";
import {PrivacyComponent} from './privacy/privacy.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {AdminGuard} from "./shared/guards/admin.guard";
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    NotFoundComponent,
    HomeComponent,
    MenuComponent,
    PrivacyComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocialLoginModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'forbidden', component: ForbiddenComponent},
      {path: '404', component: NotFoundComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: '**', redirectTo: '/404', pathMatch: 'full'}
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7249']
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'YOUR_CLIENT_ID'
            )
          },
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
