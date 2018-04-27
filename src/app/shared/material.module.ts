import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  MatButtonModule
} from '@angular/material';

const imports = [MatSidenavModule, MatExpansionModule, MatListModule, MatButtonModule];

@NgModule({
  imports,
  exports: [...imports]
})
export class MaterialModule {}
