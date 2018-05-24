import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';

import { SingleLineComponent } from './single-line/single-line.component';
import { MultiLineComponent } from './multi-line/multi-line.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'single-line',
            component: SingleLineComponent
          },
          {
            path: 'multi-line',
            component: MultiLineComponent
          },
          {
            path: '',
            redirectTo: '/single-line',
            pathMatch: 'full'
          }
        ]
      }
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SingleLineComponent, MultiLineComponent]
})
export class TextDisplayModule {}
