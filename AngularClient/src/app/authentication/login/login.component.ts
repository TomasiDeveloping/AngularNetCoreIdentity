import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserForAuthenticationDto} from "../../_interfaces/user/userForAuthenticationDto.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  public loginForm: FormGroup;
  public errorMessage: string = '';
  // @ts-ignore
  public showError: boolean;
  // @ts-ignore
  private _returnUrl: string;

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }

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

  public loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }
    this._authService.loginUser('api/accounts/login', userForAuth).subscribe({
      next: ((res) => {
        // @ts-ignore
        localStorage.setItem("token", res.token);
        // @ts-ignore
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
