import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import { MethodsService, Method } from '../../core/methods.service';
import { alphanumeric } from '../../shared/validators';

@Component({
  selector: 'joul-multi-line',
  templateUrl: './multi-line.component.html',
  styleUrls: ['./multi-line.component.scss']
})
export class MultiLineComponent {
  fields = this.fb.group({
    fieldValues: this.fb.array([this.newControl()])
  });

  get fieldValues(): FormArray {
    return this.fields.get('fieldValues') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  newValue() {
    this.fieldValues.push(this.newControl());
  }

  newControl(value = '') {
    return new FormControl(value, alphanumeric());
  }
}
