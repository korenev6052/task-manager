import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface FormFields {
  [key: string]: [string, (ValidatorFn | ValidatorFn[])?, AsyncValidatorFn?]
}