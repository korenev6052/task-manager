import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { FormErrors } from 'src/app/shared/interfaces/form-errors.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  form: FormGroup;
  formErrors: FormErrors = {};

  ngOnInit() {
    this.authService.tryLocalStorageLogin(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/system']);
      }
    });

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.formErrors = {
      email: {
        required: 'Емейл не может быть пустым',
        email: 'Некорректный емейл'
      },
      password: {
        required: 'Пароль не может быть пустым'
      }
    }
  }

  onSubmit() {
    const { email, password } = this.form.value;
    this.authService.tryLogin(email, password, () => {
      this.router.navigate(['/system']);
    }, () => {
      this.snackBar.open('Неверный емейл или пароль', 'Закрыть', { duration: 3000, verticalPosition: 'bottom' });
    })
  }
}