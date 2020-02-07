import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SystemComponent
  ]
})
export class SystemModule { }
