import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NavbarItem } from '../shared/models/navbar-item.model';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/models/user.model';
import { ManagersService } from './shared/services/managers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private managersService: ManagersService,
    private snackBar: MatSnackBar
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
        const managers = users.map((user) => {
          const { fullName, id } = user;
          return { fullName, id };
        });
        this.managersService.managers = managers;
      }, (error) => {
        this.snackBar.open('Произошла ошибка', 'Закрыть', { duration: 3000, verticalPosition: 'bottom' });
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}