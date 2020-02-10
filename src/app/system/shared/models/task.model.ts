export class Task {
  constructor(
    public title: string,
    public managerId: number,
    public description: string,
    public priority: string,
    public status: string,
    public id?: number
  ) { }
}