import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task.model';
import { SingleFormComponent } from 'src/app/shared/components/single-form/single-form.component';
import { TaskPriorities } from '../shared/consts/task-priorities.const';
import { TaskStatuses } from '../shared/consts/task-statuses.const';
import { ManagersService } from '../shared/services/managers.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent extends SingleFormComponent implements OnInit, OnDestroy {
  constructor(
    formBuilder: FormBuilder,
    snackBar: MatSnackBar,
    private router: Router,
    private tasksService: TasksService,
    private managersService: ManagersService,
    private authService: AuthService
  ) {
    super(formBuilder, snackBar);
  }

  loaded: boolean = false;
  editTaskId: number = null;
  admin: boolean = false;

  priorities = TaskPriorities;
  prioritiesOpts = Object.values(this.priorities);

  statuses = TaskStatuses;
  statusesOpts = Object.values(this.statuses);
  statusesOVDisabled: string[] = [];

  managersOpts = this.managersService.fullNameValues;
  managersOptsValues = this.managersService.idValues;

  destroy: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.admin = this.authService.isAdmin();

    if (!this.admin) {
      this.statusesOVDisabled = [
        this.statuses.inactive,
        this.statuses.verified,
        this.statuses.closed
      ]
    }

    const urlArr = this.router.url.split('/');
    const taskId = +urlArr[urlArr.length - 1];

    this.tasksService.getTaskById(taskId)
      .pipe(takeUntil(this.destroy))
      .subscribe((task: Task) => {
        this.initForm({
          title: [task.title, Validators.required],
          managerId: [String(task.managerId)],
          description: [task.description],
          priority: [task.priority, Validators.required],
          status: [task.status, Validators.required],
        }, {
          title: {
            required: 'Название не может быть пустым'
          },
          managerId: {
            required: 'Исполнитель не может быть пустым'
          },
          priority: {
            required: 'Приоритет не может быть пустым'
          },
          status: {
            required: 'Статуc не может быть пустым'
          }
        });

        this.editTaskId = task.id;
        this.loaded = true;
      });
  }

  onSubmit() {
    const task = this.form.value;
    task.managerId = +task.managerId;
    task.id = this.editTaskId;
    this.makeRequest = this.tasksService.updateTask(task);
    this.formSubmit();
  }

  onSubmitSuccess(task: Task) {
    this.showMessage('Изменения сохранены');
    this.router.navigate(['/system', 'task-list']);
  }

  statusChange(status: string) {
    const managerIdCtrl = this.form.get('managerId');

    if (status !== this.statuses.inactive) {
      managerIdCtrl.setValidators(this.checkManagerId);
    } else {
      managerIdCtrl.clearValidators();
    }

    managerIdCtrl.markAsTouched();
    managerIdCtrl.updateValueAndValidity();
  }

  checkManagerId(control: FormControl) {
    const managerId = +control.value;
    return (!managerId) ? { required: true } : null;
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
