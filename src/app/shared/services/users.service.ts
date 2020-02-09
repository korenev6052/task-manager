import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.JSONServer}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.JSONServer}/users`);
  }

  getUsersByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.JSONServer}/users?email=${email}`);
  }
}