import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean = false;
  public showError: boolean = false;
  public errorMessage: string = '';

  constructor(private _authService: AuthenticationService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    console.log(token);
    this._authService.confirmEmail('api/accounts/emailconfirmation', token, email).subscribe({
      next: ((_) => {
        this.showSuccess = true;
      }),
      error: (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
    });
  }

}
