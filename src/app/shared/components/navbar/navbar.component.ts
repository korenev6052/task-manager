import { Component, Input } from '@angular/core';

import { NavbarItem } from '../../models/navbar-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() items: NavbarItem[];
}
