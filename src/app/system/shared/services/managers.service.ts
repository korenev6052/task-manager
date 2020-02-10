import { Injectable } from '@angular/core';

import { Manager } from '../models/manager.model';

@Injectable()
export class ManagersService {
  managers: Manager[] = [];

  addManager(manager: Manager) {
    this.managers.push(manager);
  }

  get idValues(): number[] {
    return this.managers.map((manager) => manager.id);
  }

  get fullNameValues(): string[] {
    return this.managers.map((manager) => manager.fullName);
  }
}