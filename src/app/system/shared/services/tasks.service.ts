import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.JSONServer}/tasks`, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.JSONServer}/tasks`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.JSONServer}/tasks/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.JSONServer}/tasks/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.delete<any>(`${environment.JSONServer}/tasks/${task.id}`);
  }
}