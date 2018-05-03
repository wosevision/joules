import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MethodsService, Method } from '../../core/methods.service';

export function alphanumeric(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const isAlphanumeric = /^[a-zA-Z0-9_\ ~!@#$%^&*()\-+=<>?/,.\\[{\]}:;"'|]*$/.test(control.value);
    return !isAlphanumeric
      ? {
          alphanumeric: {
            value: control.value
          }
        }
      : null;
  };
}

@Component({
  selector: 'joul-single-line',
  templateUrl: './single-line.component.html',
  styleUrls: ['./single-line.component.scss']
})
export class SingleLineComponent implements OnInit {
  fieldValue = new FormControl('', alphanumeric());
  value;

  constructor(private methods: MethodsService) {}

  ngOnInit() {
    this.fieldValue.valueChanges.subscribe(console.log);
  }

  submitText() {
    if (this.fieldValue.valid) {
      this.fieldValue.disable();
      this.methods
        .send(Method.SingleLine, { message: this.fieldValue.value })
        .subscribe(value => this.fieldValue.enable());
    }
  }
}
