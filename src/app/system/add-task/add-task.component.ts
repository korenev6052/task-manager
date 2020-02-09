import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SingleFormComponent } from 'src/app/shared/components/single-form/single-form.component';
import { TasksService } from '../shared/services/tasks.service';
import { TaskPriorities, TaskPrioritiesValues } from '../shared/consts/task-priorities.const';
import { TaskStatuses, TaskStatusesValues } from '../shared/consts/task-statuses.const';
import { ManagersService } from '../shared/services/managers.service';

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
    private managersService: ManagersService
  ) {
    super(formBuilder, snackBar);
  }

  priorities = TaskPriorities;
  prioritiesValues = TaskPrioritiesValues;
  statuses = TaskStatuses;
  statusesValues = TaskStatusesValues;
  managersValues: string[] = [];

  ngOnInit() {
    this.managersValues = this.managersService.getManagersValues();

    this.initForm({
      title: ['', Validators.required],
      manager: ['', Validators.required],
      description: [''],
      priority: [this.priorities.average, Validators.required],
      status: [this.statuses.inactive, Validators.required],
    }, {
      title: {
        required: 'Название не может быть пустым'
      },
      manager: {
        required: 'Исполнитель не может быть пустым'
      },
      priority: {
        required: 'Приоритет не может быть пустым'
      },
      status: {
        required: 'Статуc не может быть пустым'
      }
    })
  }

  onSubmit() {
    const { title, manager, description, priority, status } = this.form.value;
    this.makeRequest = this.tasksService.addTask({
      title,
      managerId: this.managersService.getManagerIdByValue(manager),
      description,
      priority,
      status
    });
    this.formSubmit();
  }
}
