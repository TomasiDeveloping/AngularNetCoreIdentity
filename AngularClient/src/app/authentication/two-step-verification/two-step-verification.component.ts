import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TwoFactorDto} from "../../_interfaces/twoFactor/twoFactorDto.model";

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoStepVerificationComponent implements OnInit {

  // @ts-ignore
  public twoStepForm: FormGroup;
  public showError: boolean = false;
  public errorMessage: string = '';
  private _provider: string = ``;
  private _email: string = '';
  private _returnUrl: string = '';

  constructor(private _authService: AuthenticationService, private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    this.twoStepForm = new FormGroup({
      twoFactorCode: new FormControl('', [Validators.required]),
    });

    this._provider = this._route.snapshot.queryParams['provider'];
    this._email = this._route.snapshot.queryParams['email'];
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'];
  }

  public validateControl = (controlName: string) => {
    return this.twoStepForm.controls[controlName].invalid && this.twoStepForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.twoStepForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (twoStepFromValue: any) => {
    this.showError = false;

    const formValue = { ...twoStepFromValue };
    let twoFactorDto: TwoFactorDto = {
      email: this._email,
      provider: this._provider,
      token: formValue.twoFactorCode
    }
    this._authService.twoStepLogin('api/accounts/twostepverification', twoFactorDto).subscribe({
      next: ((res) => {
        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this._router.navigate([this._returnUrl]).then();
      }),
      error: (error) => {
        this.errorMessage = error;
        this.showError = true;
      }
    });
  }

}
