export class Task {
  constructor(
    public title: string,
    public manager: string,
    public description: string,
    public priority: string,
    public status: string,
    public id?: number
  ) { }
}