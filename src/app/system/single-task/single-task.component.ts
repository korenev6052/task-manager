import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../shared/models/task.model';
import { ManagersService } from '../shared/services/managers.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskStatuses } from '../shared/consts/task-statuses.const';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {
  constructor(
    private managersService: ManagersService,
    private router: Router,
    private authService: AuthService
  ) { }

  @Input() task: Task;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter<Task>();

  manager: string = '';
  admin: boolean = false;
  statuses = TaskStatuses;

  ngOnInit() {
    this.manager = this.managersService.getFullNameById(this.task.managerId);
    this.admin = this.authService.isAdmin();
  }

  edit() {
    this.router.navigate(['/system', 'edit-task', this.task.id]);
  }

  delete() {
    this.onDelete.emit(this.task);
  }
}
