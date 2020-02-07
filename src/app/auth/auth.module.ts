import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
