import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { SingleFormComponent } from './components/single-form/single-form.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { DisableControlDirective } from './directives/disable-control.directive';

@NgModule({
  declarations: [
    SingleFormComponent,
    TextInputComponent,
    NavbarComponent,
    SelectInputComponent,
    DisableControlDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [
    ReactiveFormsModule,
    SingleFormComponent,
    TextInputComponent,
    SelectInputComponent,
    NavbarComponent,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule
  ]
})
export class SharedModule { }
