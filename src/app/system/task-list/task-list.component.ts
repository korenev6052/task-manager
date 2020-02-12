import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task.model';
import { SortType, SortTypeIcon } from '../shared/consts/sort-type.const'
import { ManagersService } from '../shared/services/managers.service';
import { TaskPrioritiesSort } from '../shared/consts/task-priorities.const';
import { TaskStatusesSort } from '../shared/consts/task-statuses.const';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  constructor(
    private tasksService: TasksService,
    private snackBar: MatSnackBar,
    private managersService: ManagersService
  ) { }

  loaded: boolean = false;
  sortingSet: boolean = false;

  originTasks: Task[] = [];
  tasks: Task[] = [];

  sortType = SortType;
  sortTypeIcon = SortTypeIcon;
  keySortType = {
    title: this.sortType.default,
    managerId: this.sortType.default,
    priority: this.sortType.default,
    status: this.sortType.default
  }

  statusesSort = TaskStatusesSort;
  prioritiesSort = TaskPrioritiesSort;

  destroy: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.tasksService.getTasks()
      .pipe(takeUntil(this.destroy))
      .subscribe((tasks: Task[]) => {
        this.originTasks = tasks;
        this.tasks = this.originTasks;
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

  makeSort(event) {
    const key = event.target.dataset.key;

    if (this.keySortType[key] === this.sortType.ascending) {
      this.keySortType[key] = this.sortType.descending;
    } else {
      this.keySortType[key] = this.sortType.ascending;
    }

    this.tasks = this.tasks.sort((taskA, taskB) => {
      this.sortingSet = true;

      let a = taskA[key];
      let b = taskB[key];

      if (key === 'title') {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }

      if (key === 'managerId') {
        a = this.managersService.getFullNameById(a).toLowerCase();
        b = this.managersService.getFullNameById(b).toLowerCase();
      }

      if (key === 'status') {
        a = this.statusesSort[taskA[key]];
        b = this.statusesSort[taskB[key]];
      }

      if (key === 'priority') {
        a = this.prioritiesSort[taskA[key]];
        b = this.prioritiesSort[taskB[key]];
      }

      if (this.keySortType[key] === this.sortType.ascending) {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a < b) return 1;
        if (a > b) return -1;
      }

      return 0;
    });
  }

  resetSort() {
    this.sortingSet = false;
    this.tasks = this.originTasks;
    this.keySortType = {
      title: this.sortType.default,
      managerId: this.sortType.default,
      priority: this.sortType.default,
      status: this.sortType.default
    }
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
