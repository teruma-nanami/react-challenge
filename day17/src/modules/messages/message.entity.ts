import { User } from "../users/user.entity";
export class Message {
  id!: string;
  content?: string;
  imageUrl?: string;
  user!: User;
  CreatedAt!: Date;
  constructor(data: Message) {
    Object.assign(this, data);
    this.CreatedAt = new Date(data.CreatedAt);
    if (data.user != null) {
      this.user = new User(data.user);
    }
  }

  get dateString(): string {
    return this.CreatedAt.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}
