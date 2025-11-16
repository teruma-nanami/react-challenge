export class User {
  id!: string;
  name!: string;
  email!: string;
  thumbnailUrl?: string;
  constructor(data: User) {
    Object.assign(this, data);
  }
}
