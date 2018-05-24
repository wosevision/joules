import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

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
    if (this.field.valid) {
      this.field.disable();
      this.methods
        .send(this.method, this.field.value)
        .subscribe(value => this.field.enable());
    }
  }

}
