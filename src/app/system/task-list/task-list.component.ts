import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  constructor(private tasksService: TasksService) { }

  destroy: Subject<any> = new Subject<any>();
  originTasks: Task[] = [];
  tasks: Task[] = [];

  ngOnInit() {
    this.tasksService.getTasks()
      .pipe(takeUntil(this.destroy))
      .subscribe((tasks: Task[]) => {
        this.originTasks = tasks;
      })
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
