export class WorkspaceUser {
  id!: string;
  userId!: string;
  workspaceId!: string;
  constructor(data: WorkspaceUser) {
    Object.assign(this, data);
  }
}
