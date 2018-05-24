import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';

import { SubmitterComponent } from './submitter.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [SubmitterComponent],
  exports: [SubmitterComponent]
})
export class SharedModule { }
