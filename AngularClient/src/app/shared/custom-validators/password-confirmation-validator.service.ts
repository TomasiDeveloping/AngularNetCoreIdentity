import {Injectable} from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PasswordConfirmationValidatorService {

  constructor() {
  }

  public validateConfirmPassword = (passwordControl: AbstractControl | null): ValidatorFn => {
    return (confirmationControl: AbstractControl): { [key: string]: boolean } | null => {
      const confirmValue = confirmationControl.value;
      // @ts-ignore
      const passwordValue = passwordControl.value;
      if (confirmValue === '') {
        // @ts-ignore
        return;
      }
      if (confirmValue !== passwordValue) {
        return {mustMatch: true}
      }
      return null;
    };
  }
}
