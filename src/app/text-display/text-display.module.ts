import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';

import { SingleLineComponent } from './single-line/single-line.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'text-display',
        children: [
          {
            path: 'single-line',
            component: SingleLineComponent
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
  declarations: [SingleLineComponent]
})
export class TextDisplayModule {}
