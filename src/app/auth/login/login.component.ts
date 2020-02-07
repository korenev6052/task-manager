import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SingleFormComponent } from 'src/app/shared/components/single-form/single-form.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends SingleFormComponent implements OnInit {
  constructor(formBuilder: FormBuilder, snackBar: MatSnackBar, private usersService: UsersService, private authService: AuthService, private router: Router) {
    super(formBuilder, snackBar);
  }

  ngOnInit() {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user) {
      this.tryLogin(user.email, user.password);
    }

    this.initForm({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }, {
      email: {
        required: 'Емейл не может быть пустым',
        email: 'Некорректный емейл'
      },
      password: {
        required: 'Пароль не может быть пустым'
      }
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;
    this.tryLogin(email, password);
  }

  tryLogin(email: string, password: string) {
    this.usersService.getUsersByEmail(email)
      .pipe(takeUntil(this.destroy))
      .subscribe((users: User[]) => {
        if (!users[0] || users[0].email !== email || users[0].password !== password) {
          this.failMessage = 'Неверный емейл или пароль';
          this.snackBar.open(this.failMessage, 'Закрыть', { duration: 3000, verticalPosition: 'bottom' });
          return;
        }

        window.localStorage.setItem('user', JSON.stringify(users[0]));
        this.authService.login();
        this.router.navigate(['/system']);
      });
  }
}