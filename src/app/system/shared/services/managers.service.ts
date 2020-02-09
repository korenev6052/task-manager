import { Injectable } from '@angular/core';

import { Manager } from '../models/manager.model';

@Injectable()
export class ManagersService {
  managers: Manager[] = [];

  addManager(manager: Manager) {
    this.managers.push(manager);
  }

  getManagersValues(): string[] {
    return this.managers.map((manager) => {
      return `${manager.fullName} (id: ${manager.id})`;
    });
  }

  getManagerIdByValue(value: string): number {
    if (!value) return null;

    const begin = value.indexOf(':') + 1;
    const end = value.length - 1;
    return +value.slice(begin, end);
  }
}