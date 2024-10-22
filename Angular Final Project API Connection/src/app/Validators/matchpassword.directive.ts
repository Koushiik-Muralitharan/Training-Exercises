import { Directive } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appMatchpassword]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchpasswordDirective,
      multi: true,
    },
  ],
})
export class MatchpasswordDirective implements Validator {
  constructor() {}

  validate(formGroup: FormGroup): ValidationErrors | null {
    const passwordControl = formGroup.get('userpassword');
    const confirmPasswordControl = formGroup.get('userconfirmpassword');
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
    ) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  }
}
