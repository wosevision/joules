import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MethodsService, Method } from '../../core/methods.service';
import { alphanumeric } from '../../shared/validators';

@Component({
  selector: 'joul-single-line',
  templateUrl: './single-line.component.html',
  styleUrls: ['./single-line.component.scss']
})
export class SingleLineComponent implements OnInit {
  fieldValue = new FormControl('', alphanumeric());
  method: Method.SingleLine = Method.SingleLine;

  constructor(private methods: MethodsService) {}

  ngOnInit() {
    this.fieldValue.valueChanges.subscribe(console.log);
  }
}
