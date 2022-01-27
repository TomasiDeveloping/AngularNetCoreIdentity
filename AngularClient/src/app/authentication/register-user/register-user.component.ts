import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {UserForRegistrationDto} from "../../_interfaces/user/UserForRegistrationDto.model";
import {
  PasswordConfirmationValidatorService
} from "../../shared/custom-validators/password-confirmation-validator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  // @ts-ignore
  public registerForm: FormGroup;
  public errorMessage: string = '';
  // @ts-ignore
  public showError: boolean;

  constructor(private _authService: AuthenticationService, private _passConfValidator: PasswordConfirmationValidatorService,  private _router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    // @ts-ignore
    this.registerForm.get('confirm').setValidators([Validators.required,
    this._passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    this.showError = false;
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      clientURI: 'http://localhost:4200/authentication/emailconfirmation'
    };
    this._authService.registerUser("api/accounts/registration", user).subscribe({
      next: (_ => {
        this._router.navigate(["/authentication/login"]).then();
      }),
      error: error => {
        this.errorMessage = error;
        this.showError = true;
      }
    });
  }

}
