import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarItem } from '../../models/navbar-item.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  @Input() items: NavbarItem[];
  @Input() loggedIn: boolean = false;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
