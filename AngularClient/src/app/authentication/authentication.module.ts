import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { RegisterUserComponent } from './register-user/register-user.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'register', component: RegisterUserComponent}
    ]),
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
