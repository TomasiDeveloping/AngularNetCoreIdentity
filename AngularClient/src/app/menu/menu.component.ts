import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // @ts-ignore
  public isUserAuthenticated: boolean;

  constructor(private _authService: AuthenticationService,  private _router: Router) {
    this._authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      });
  }

  ngOnInit(): void {

  }

  public logout = () => {
    this._authService.logout();
    this._router.navigate(["/"]).then();
  }

}
