import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodsService } from './methods.service';
import { TitleCasePipe } from './title-case.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TitleCasePipe],
  providers: [MethodsService],
  exports: [TitleCasePipe]
})
export class CoreModule {}
