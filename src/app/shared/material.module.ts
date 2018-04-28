import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatButtonModule
} from '@angular/material';

const imports = [MatSidenavModule, MatExpansionModule, MatListModule, MatButtonModule];
  MatIconModule,

@NgModule({
  imports,
  exports: [...imports]
})
export class MaterialModule {}
