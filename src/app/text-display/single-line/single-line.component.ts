import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Method } from '../../core/methods.service';
import { alphanumeric } from '../../shared/validators';

@Component({
  selector: 'joul-single-line',
  templateUrl: './single-line.component.html',
  styleUrls: ['./single-line.component.scss']
})
export class SingleLineComponent {
  fieldValue = new FormControl('', alphanumeric());
  method: Method.SingleLine = Method.SingleLine;
}
