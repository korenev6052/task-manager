import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { SingleFormComponent } from './components/single-form/single-form.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    SingleFormComponent,
    TextInputComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  exports: [
    ReactiveFormsModule,
    SingleFormComponent,
    TextInputComponent,
    NavbarComponent,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
