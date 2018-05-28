import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Method } from '../../core/methods.service';
import { alphanumeric } from '../../shared/validators';

@Component({
  selector: 'joul-flashing-border',
  templateUrl: './flashing-border.component.html',
  styleUrls: ['./flashing-border.component.scss']
})
export class FlashingBorderComponent {
  fieldValue = new FormControl('', alphanumeric());
  method: Method.FlashingBorder = Method.FlashingBorder;
}
