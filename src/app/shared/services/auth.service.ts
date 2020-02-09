import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { UsersService } from './users.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  private loggedIn = false;

  login(user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn = true;
  }

  logout() {
    window.localStorage.clear();
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  tryLogin(email: string, password: string, successCallback?: () => void, failCallback?: () => void) {
    this.usersService.getUsersByEmail(email)
      .pipe(first())
      .subscribe((users: User[]) => {
        if (users[0] && users[0].email === email && users[0].password === password) {
          this.login(users[0]);
          if (successCallback) successCallback();
        } else {
          if (failCallback) failCallback();
        }
      });
  }

  tryLocalStorageLogin(successCallback?: () => void, failCallback?: () => void) {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user) {
      this.tryLogin(user.email, user.password, successCallback, failCallback);
    }
  }
}