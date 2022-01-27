import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentUrlService} from "./environment-url.service";
import {UserForRegistrationDto} from "../../_interfaces/user/UserForRegistrationDto.model";
import {RegistrationResponseDto} from "../../_interfaces/response/registrationResponseDto.model";
import {UserForAuthenticationDto} from "../../_interfaces/user/userForAuthenticationDto.model";
import {Subject} from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import {ForgotPassword} from "../../_interfaces/forgotPassword.model";
import {ResetPasswordDto} from "../../_interfaces/resetPasswordDto.model";
import {CustomEncoder} from "../customEncoder";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>();
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelper: JwtHelperService) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto> (this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    // @ts-ignore
    return token && !this._jwtHelper.isTokenExpired(token);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public forgotPassword = (route: string, body: ForgotPassword) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public resetPassword = (route: string, body: ResetPasswordDto) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    return this._http.get(this.createCompleteRoute(route, this._envUrl.urlAddress), { params: params });
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    // @ts-ignore
    const decodedToken = this._jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role === 'Administrator';
  }
}
