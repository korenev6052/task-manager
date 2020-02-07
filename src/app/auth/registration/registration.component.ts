import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';

import { SingleFormComponent } from 'src/app/shared/components/single-form/single-form.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends SingleFormComponent implements OnInit {
  constructor(formBuilder: FormBuilder, snackBar: MatSnackBar, private usersService: UsersService) {
    super(formBuilder, snackBar);
  }

  ngOnInit() {
    this.initForm({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], this.emailUsed.bind(this)],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      fullName: {
        required: 'Имя не может быть пустым'
      },
      email: {
        required: 'Емейл не может быть пустым',
        email: 'Некорректный емейл',
        emailUsed: 'Емейл уже зарегистрирован'
      },
      password: {
        required: 'Пароль не может быть пустым',
        minlength: 'Пароль не может быть менее 8 символов'
      }
    });
  }

  emailUsed(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUsersByEmail(control.value)
        .pipe(takeUntil(this.destroy))
        .subscribe((users: User[]) => {
          if (users.length) {
            resolve({ emailUsed: true });
          } else {
            resolve(null);
          }
        });
    });
  }

  onSubmit() {
    const { fullName, email, password } = this.form.value;
    this.makeRequest = this.usersService.createUser({ fullName, email, password });
    this.formSubmit();
  }
}