import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { RegisterUserComponent } from './register-user/register-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';



@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'register', component: RegisterUserComponent},
      {path: 'login', component: LoginComponent},
      { path: 'forgotpassword', component: ForgotPasswordComponent},
      {path: 'resetpassword', component: ResetPasswordComponent},
      {path: 'emailconfirmation', component: EmailConfirmationComponent}
    ]),
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
