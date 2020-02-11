import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Task } from '../shared/models/task.model';
import { ManagersService } from '../shared/services/managers.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {
  constructor(private managersService: ManagersService) { }

  @Input() task: Task;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter<Task>();

  manager: string;

  ngOnInit() {
    this.manager = this.managersService.getFullNameById(this.task.managerId);
  }

  delete() {
    this.onDelete.emit(this.task);
  }
}