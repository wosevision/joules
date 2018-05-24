import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MethodsService, Method } from '../../core/methods.service';
import { alphanumeric } from '../../shared/validators';

@Component({
  selector: 'joul-multi-line',
  templateUrl: './multi-line.component.html',
  styleUrls: ['./multi-line.component.scss']
})
export class MultiLineComponent implements OnInit {
  fields = this.fb.group({
    fieldValues: this.fb.array([])
  });

  get fieldValues(): FormArray {
    return this.fields.get('fieldValues') as FormArray;
  }

  constructor(private fb: FormBuilder, private methods: MethodsService) {}

  ngOnInit() {
    this.fieldValues.valueChanges.subscribe(console.log);
  }

  newValue() {
    this.fieldValues.push(new FormControl('', alphanumeric()));
  }

  // submitText() {
  //   if (this.fieldValues.valid) {
  //     this.fieldValues.disable();
  //     this.methods
  //       .send(Method.SingleLine, [this.fieldValues.value])
  //       .subscribe(value => this.fieldValues.enable());
  //   }
  // }
}
