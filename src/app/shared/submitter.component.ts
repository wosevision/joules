import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import axis from 'axis.js';

import { Method, MethodsService } from '../core/methods.service';

@Component({
  selector: 'joul-submitter',
  templateUrl: './submitter.component.html'
})
export class SubmitterComponent {

  @Input() method: Method;
  @Input() field: AbstractControl;

  constructor(private methods: MethodsService) { }

  submit() {
    console.log('[submission]', this.field.value);
    if (this.field.valid) {
      this.field.disable();
      const value = this.field.value;
      this.methods
        .send(this.method, axis.isArray(value) ? value : [value])
        .subscribe(() => this.field.enable());
    }
  }

}
