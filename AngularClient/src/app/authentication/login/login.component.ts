import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserForAuthenticationDto} from "../../_interfaces/user/userForAuthenticationDto.model";
import {SocialUser} from "angularx-social-login";
import {ExternalAuthDto} from "../../_interfaces/externalAuthDto.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;
  private _returnUrl: string = '';

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public externalLogin = () => {
    this.showError = false;
    this._authService.signInWithGoogle()
      .then(res => {
        const user: SocialUser = {...res};
        console.log(user);
        const externalAuth: ExternalAuthDto = {
          provider: user.provider,
          idToken: user.idToken
        }
        this.validateExternalAuth(externalAuth);
      }, error => console.log(error))
  }

  public loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = {...loginFormValue};
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password,
      clientURI: 'http://localhost:4200/authentication/forgotpassword'
    }
    this._authService.loginUser('api/accounts/login', userForAuth).subscribe({
      next: ((res) => {
        // @ts-ignore
        if (res.is2StepVerificationRequired) {
          this._router.navigate(['/authentication/twostepverification'],
            // @ts-ignore
            {queryParams: {returnUrl: this._returnUrl, provider: res.provider, email: userForAuth.email}}).then();
        } else {
          // @ts-ignore
          localStorage.setItem("token", res.token);
          // @ts-ignore
          this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this._router.navigate([this._returnUrl]).then();
        }
      }),
      error: (error) => {
        this.errorMessage = error;
        this.showError = true;
      }
    });
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this._authService.externalLogin('api/accounts/externallogin', externalAuth).subscribe({
      next: ((res) => {
        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this._router.navigate([this._returnUrl]).then();
      }),
      error: (error) => {
        this.errorMessage = error;
        this.showError = true;
        this._authService.signOutExternal();
      }
    });
  }

}
