import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

const imports = [MatSidenavModule];

@NgModule({
  imports,
  exports: [...imports]
})
export class MaterialModule {}
