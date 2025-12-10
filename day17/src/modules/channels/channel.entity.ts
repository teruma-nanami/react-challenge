export class Channel {
  id!: string;
  name!: string;
  constructor(data: Channel) {
    Object.assign(this, data);
  }
}
