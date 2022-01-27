import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { RegisterUserComponent } from './register-user/register-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'register', component: RegisterUserComponent},
      {path: 'login', component: LoginComponent}
    ]),
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
