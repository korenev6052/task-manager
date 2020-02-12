import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {
  constructor(private ngControl: NgControl) { }

  @Input() set disableControl(value: boolean) {
    const action = value ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }
}