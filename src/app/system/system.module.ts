import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { SystemComponent } from './system.component';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksService } from './shared/services/tasks.service';
import { ManagersService } from './shared/services/managers.service';
import { SingleTaskComponent } from './single-task/single-task.component';

@NgModule({
  declarations: [
    SystemComponent,
    AddTaskComponent,
    TaskListComponent,
    SingleTaskComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    MatExpansionModule
  ],
  providers: [
    TasksService,
    ManagersService
  ]
})
export class SystemModule { }
