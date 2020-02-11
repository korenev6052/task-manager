import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  constructor(private tasksService: TasksService, private snackBar: MatSnackBar) { }

  loaded: boolean = false;
  originTasks: Task[] = [];
  tasks: Task[] = [];
  destroy: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.tasksService.getTasks()
      .pipe(takeUntil(this.destroy))
      .subscribe((tasks: Task[]) => {
        this.originTasks = tasks;
        this.tasks = tasks;
        this.loaded = true;
      });
  }

  deleteTask(targetTask: Task) {
    this.tasksService.deleteTask(targetTask)
      .pipe(takeUntil(this.destroy))
      .subscribe((response) => {
        this.originTasks = this.originTasks.filter((task) => task !== targetTask);
        this.tasks = this.tasks.filter((task) => task !== targetTask);
        this.showMessage('Задача удалена');
      }, (error) => {
        this.showMessage('Произошла ошибка');
      });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Закрыть', { duration: 3000, verticalPosition: 'bottom' });
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
