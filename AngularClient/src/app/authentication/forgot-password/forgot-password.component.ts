import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {ForgotPassword} from "../../_interfaces/forgotPassword.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  // @ts-ignore
  public forgotPasswordForm: FormGroup;
  public successMessage: string = '';
  public errorMessage: string = '';
  public showSuccess: boolean = false;
  public showError: boolean = false;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    });
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPassword = {
      email: forgotPass.email,
      clientURI: 'http://localhost:4200/authentication/resetpassword'
    }
    this._authService.forgotPassword('api/accounts/forgotpassword', forgotPassDto).subscribe({
      next: ((_) => {
        this.showSuccess = true;
        this.successMessage =  'The link has been sent, please check your email to reset your password.';
      }),
      error: (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
    });
  }

}
