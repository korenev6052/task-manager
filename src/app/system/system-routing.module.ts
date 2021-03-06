import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      { path: 'add-task', component: AddTaskComponent },
      { path: 'task-list', component: TaskListComponent },
      { path: 'edit-task', redirectTo: 'task-list' },
      { path: 'edit-task/:id', component: EditTaskComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SystemRoutingModule { }