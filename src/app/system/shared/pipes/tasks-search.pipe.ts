import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '../models/task.model';
import { ManagersService } from '../services/managers.service';

@Pipe({
  name: 'tasksSearch'
})
export class TasksSearchPipe implements PipeTransform {
  constructor(private managersService: ManagersService) { }

  transform(tasks: Task[], key: string, value: string) {
    if (tasks.length === 0 || !key || !value) {
      return tasks;
    }
    console.log(key, value);
    if (key === 'managerId') {
      return tasks.filter((task) => {
        const fullName = this.managersService.getFullNameById(task.managerId);
        return (fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      });
    }

    return tasks.filter((task) => {
      return (task[key].toLowerCase().indexOf(value.toLowerCase()) !== -1);
    });
  }
}