import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() label: string;
  @Input() opts: string[];
  @Input() optsValues: string[];
  @Input() optsValuesDisabled: string[];
  @Input() errors: object;
  @Input() disable: boolean;

  @Output() onValueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  errorMessage: string = '';
  optsDisabled: boolean[] = [];

  ngOnInit() {
    if (!this.optsValues || !this.optsValues.length) {
      this.optsValues = this.opts;
    }

    if (this.optsValuesDisabled && this.optsValuesDisabled.length) {
      this.optsDisabled = this.optsValues.map((value) => {
        return this.optsValuesDisabled.indexOf(value) !== -1;
      });
    }
  }

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

  valueChange(event: MatSelectChange) {
    this.onValueChange.emit(event.value);
  }
}
