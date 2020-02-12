import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
  @Input() form: FormGroup;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() label: string;
  @Input() errors: object;
  @Input() textarea: boolean;
  @Input() readonly: boolean;

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
