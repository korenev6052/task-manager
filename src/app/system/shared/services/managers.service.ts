import { Injectable } from '@angular/core';

import { Manager } from '../models/manager.model';

@Injectable()
export class ManagersService {
  managers: Manager[] = [];

  get idValues(): number[] {
    return this.managers.map((manager) => manager.id);
  }

  get fullNameValues(): string[] {
    return this.managers.map((manager) => manager.fullName);
  }

  getFullNameById(id: number): string {
    if (!id) return '';

    const targetManager = this.managers.find((manager) => {
      return (manager.id === id);
    });

    return targetManager.fullName;
  }
}