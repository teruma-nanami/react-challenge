export class List {
  id!: number;
  title!: string;
  position!: number;

  constructor(data: List) {
    Object.assign(this, data);
  }
}
