import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormErrors } from '../../interfaces/form-errors.interface';
import { FormFields } from '../../interfaces/form-fields.interface';

@Component({
  selector: 'app-single-form',
  template: ''
})
export class SingleFormComponent {
  constructor(protected formBuilder: FormBuilder, protected snackBar: MatSnackBar) { }

  form: FormGroup;
  formErrors: FormErrors = {};
  makeRequest: Observable<any> = of(null);
  sending: boolean = false;
  sent: boolean = false;
  destroy: Subject<any> = new Subject<any>();

  protected initForm(formFields: FormFields, formErrors?: FormErrors) {
    this.form = this.formBuilder.group(formFields);

    if (formErrors) {
      this.formErrors = formErrors;
    }
  }

  protected formSubmit() {
    if (this.form.valid) {
      this.sending = true;
      this.sent = false;
      this.makeRequest
        .pipe(takeUntil(this.destroy))
        .subscribe((response: any) => {
          this.sending = false;
          this.sent = true;
          this.form.reset();
          this.onSubmitSuccess(response);
        }, (error: any) => {
          this.sending = false;
          this.onSubmitFail(error);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  protected onSubmitSuccess(request: any) {
    this.showMessage('Форма отправлена');
  }

  protected onSubmitFail(error: any) {
    this.showMessage('Произошла ошибка');
  }

  protected showMessage(message: string) {
    this.snackBar.open(message, 'Закрыть', { duration: 3000, verticalPosition: 'bottom' });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
