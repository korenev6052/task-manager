import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private tasksService: TasksService) { }

  destroy: Subject<any> = new Subject<any>();

  ngOnInit() {
    const urlArr = this.router.url.split('/');
    const taskId = +urlArr[urlArr.length - 1];
    this.tasksService.getTaskById(taskId)
      .pipe(takeUntil(this.destroy))
      .subscribe((task: Task) => {
        console.log(task);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
