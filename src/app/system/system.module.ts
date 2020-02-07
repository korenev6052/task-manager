import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';

@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  exports: [
    SystemComponent
  ]
})
export class SystemModule { }