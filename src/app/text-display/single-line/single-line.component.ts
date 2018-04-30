import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fieldValue.valueChanges.subscribe(console.log);
  }

  submitText() {
    if (this.fieldValue.valid) {
      this.fieldValue.disable();
      this.http
        .get<{ message: string; status: string }>(
          'http://www.mocky.io/v2/5ae488b92f00002a0028e7e7?mocky-delay=5000ms'
        )
        .subscribe(value => {
          if (value.status === 'success') {
            this.snackBar.open(value.message, 'Okie dokie', { duration: 3000 });
            this.fieldValue.enable();
          }
        });
    }
  }
}
