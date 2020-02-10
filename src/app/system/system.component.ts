import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NavbarItem } from '../shared/models/navbar-item.model';
import { UsersService } from '../shared/services/users.service';
import { Manager } from './shared/models/manager.model';
import { User } from '../shared/models/user.model';
import { ManagersService } from './shared/services/managers.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private managersService: ManagersService
  ) { }

  items: NavbarItem[] = [{
    title: 'Новая задача',
    link: 'add-task'
  }, {
    title: 'Список задач',
    link: 'task-list'
  }];

  destroy: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.initManagers();
    this.router.navigate(['/system', 'task-list']);
  }

  initManagers() {
    this.usersService.getUsers()
      .pipe(takeUntil(this.destroy))
      .subscribe((users: User[]) => {
        users.forEach((user) => {
          const { fullName, id } = user;
          this.managersService.addManager({ fullName, id });
        });
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}