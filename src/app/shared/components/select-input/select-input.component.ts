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
  @Input() opts: string[] | number[];
  @Input() optsValues: string[] | number[];
  @Input() errors: object;

  @Output() onValueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  errorMessage: string;

  ngOnInit() {
    if (!this.optsValues) {
      this.optsValues = this.opts;
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
