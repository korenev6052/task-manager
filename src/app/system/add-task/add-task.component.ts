import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SingleFormComponent } from 'src/app/shared/components/single-form/single-form.component';
import { TasksService } from '../shared/services/tasks.service';
import { TaskPriorities } from '../shared/consts/task-priorities.const';
import { TaskStatuses } from '../shared/consts/task-statuses.const';
import { ManagersService } from '../shared/services/managers.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent extends SingleFormComponent implements OnInit {
  constructor(
    formBuilder: FormBuilder,
    snackBar: MatSnackBar,
    private tasksService: TasksService,
    private managersService: ManagersService,
    private router: Router,
    private authService: AuthService
  ) {
    super(formBuilder, snackBar);
  }

  admin: boolean = false;

  priorities = TaskPriorities;
  prioritiesOpts = Object.values(this.priorities);

  statuses = TaskStatuses;
  statusesOpts = Object.values(this.statuses);
  statusesOVDisabled: string[] = [];

  managersOpts = this.managersService.fullNameValues;
  managersOptsValues = this.managersService.idValues;

  ngOnInit() {
    this.admin = this.authService.isAdmin();

    if (!this.admin) {
      this.statusesOVDisabled = [
        this.statuses.verified,
        this.statuses.closed
      ];
    }

    this.initForm({
      title: ['', Validators.required],
      managerId: [''],
      description: [''],
      priority: [this.priorities.average, Validators.required],
      status: [this.statuses.inactive, Validators.required],
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
  }

  onSubmit() {
    const task = this.form.value;

    if (!task.priority) task.priority = this.priorities.average;

    task.managerId = +task.managerId;
    this.makeRequest = this.tasksService.addTask(task);
    this.formSubmit();
  }

  onSubmitSuccess() {
    this.showMessage('Задача добавлена');
    this.router.navigate(['/system', 'task-list']);
  }

  statusChange(status: string) {
    const managerIdCtrl = this.form.get('managerId');

    if (status !== this.statuses.inactive) {
      managerIdCtrl.setValidators(Validators.required);
    } else {
      managerIdCtrl.clearValidators();
    }

    managerIdCtrl.markAsTouched();
    managerIdCtrl.updateValueAndValidity();
  }
}