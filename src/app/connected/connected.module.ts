import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

import { TwitterHashtagComponent } from './twitter-hashtag/twitter-hashtag.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'twitter-hashtag',
            component: TwitterHashtagComponent
          },
          {
            path: '',
            redirectTo: '/twitter-hashtag',
            pathMatch: 'full'
          }
        ]
      }
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TwitterHashtagComponent]
})
export class ConnectedModule { }
