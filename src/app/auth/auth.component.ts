import { Component, OnInit } from "@angular/core";

import { AuthService } from '../shared/services/auth.service';
import { NavbarItem } from '../shared/models/navbar-item.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) { }

  navbarItems: NavbarItem[] = [{
    title: 'Войти',
    link: '/login'
  }, {
    title: 'Зарегистрироваться',
    link: '/registration'
  }]

  ngOnInit() {
    this.authService.tryLocalStorageLogin(() => {
      if (this.authService.isLoggedIn()) {
        this.navbarItems = [{
          title: 'Перейти в систему',
          link: '/system'
        }]
      }
    });
  }
}