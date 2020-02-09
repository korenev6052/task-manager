import { Component } from "@angular/core";

import { NavbarItem } from '../shared/models/navbar-item.model';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent {
  items: NavbarItem[] = [{
    title: 'Добавить задачу',
    link: 'add-task'
  }, {
    title: 'Список задач',
    link: 'task-list'
  }]
}