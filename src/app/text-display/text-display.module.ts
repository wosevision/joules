import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SingleLineComponent } from './single-line/single-line.component';

@NgModule({
  imports: [
    CommonModule,
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
    ])
  ],
  declarations: [SingleLineComponent]
})
export class TextDisplayModule {}
