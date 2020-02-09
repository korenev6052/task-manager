import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksService } from './shared/services/tasks.service';

@NgModule({
  declarations: [
    SystemComponent,
    AddTaskComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
  providers: [
    TasksService
  ]
})
export class SystemModule { }
