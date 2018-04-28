import { Component, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export function alphanumeric(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const isAlphanumeric = /^[a-zA-Z0-9_]*$/.test(control.value);
    return isAlphanumeric ? {
      alphanumeric: {
        value: control.value
      }
    } : null;
  };
}

@Component({
  selector: 'joul-single-line',
  templateUrl: './single-line.component.html',
  styleUrls: ['./single-line.component.scss']
})
export class SingleLineComponent implements OnInit {
  textValue = new FormControl('', alphanumeric);

  constructor() {}

  ngOnInit() {
    this.textValue.valueChanges.subscribe(value => );
  }
}
