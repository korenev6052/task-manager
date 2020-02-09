import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() label: string;
  @Input() options: string[];
  @Input() errors: object;

  errorMessage: string;

  isControlHasError(): boolean {
    const control = this.form.get(this.name);
    if (control && control.enabled && !control.valid) {
      this.setErrorMessage(control);
      return true;
    } else {
      return false;
    }
  }

  private setErrorMessage(control: AbstractControl) {
    for (const key in control.errors) {
      this.errorMessage = this.errors[key];
    }
  }
}
