import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {
  PasswordConfirmationValidatorService
} from "../../shared/custom-validators/password-confirmation-validator.service";
import {ActivatedRoute} from "@angular/router";
import {ResetPasswordDto} from "../../_interfaces/resetPasswordDto.model";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  // @ts-ignore
  public resetPasswordForm: FormGroup;
  public showSuccess: boolean = false;
  public showError: boolean = false;
  public errorMessage: string = '';
  private _token: string = '';
  private _email: string = '';

  constructor(private _authService: AuthenticationService, private _passConfValidator: PasswordConfirmationValidatorService,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    // @ts-ignore
    this.resetPasswordForm.get('confirm').setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password'))]);

    this._token = this._route.snapshot.queryParams['token'];
    this._email = this._route.snapshot.queryParams['email'];
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }
  public resetPassword = (resetPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;
    const resetPass = { ... resetPasswordFormValue };
    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this._token,
      email: this._email
    }
    this._authService.resetPassword('api/accounts/resetpassword', resetPassDto).subscribe({
      next: ((_) => {
        this.showSuccess = true;
      }),
      error: (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
      }
    );
  }

}
