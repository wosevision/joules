import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './shared/material.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'text-display',
          loadChildren: './text-display/text-display.module#TextDisplayModule'
        },
        {
          path: 'animation',
          loadChildren: './animation/animation.module#AnimationModule'
        }
      ],
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
