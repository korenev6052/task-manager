import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { UsersService } from './users.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  private user: User = null;
  private loggedIn = false;

  login(user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.loggedIn = true;
  }

  logout() {
    window.localStorage.clear();
    this.user = null;
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin() {
    return this.user.admin;
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
    } else if (failCallback) {
      failCallback();
    }
  }
}