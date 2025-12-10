export class Card {
  id!: number;
  title!: string;
  position!: number;
  description!: string;
  dueDate?: string;
  completed!: boolean;
  listId!: number;

  constructor(data: Card) {
    Object.assign(this, data);
    if (data.dueDate != null) {
      this.dueDate = new Date(data.dueDate).toLocaleDateString('sv-SE');
    }
  }
}
