import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

import { SystemComponent } from './system.component';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksService } from './shared/services/tasks.service';
import { ManagersService } from './shared/services/managers.service';
import { SingleTaskComponent } from './single-task/single-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TasksSearchPipe } from './shared/pipes/tasks-search.pipe';

@NgModule({
  declarations: [
    SystemComponent,
    AddTaskComponent,
    TaskListComponent,
    SingleTaskComponent,
    EditTaskComponent,
    TasksSearchPipe
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatButtonToggleModule,
    FormsModule
  ],
  providers: [
    TasksService,
    ManagersService
  ]
})
export class SystemModule { }
