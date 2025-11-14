import api from "../../lib/api";
import { Channel } from "./channel.entity";

export const channelRepository = {
  async find(workspaceId: string): Promise<Channel[]> {
    const result = await api.get(`/channels/${workspaceId}`);
    return result.data.map((channel: Channel) => new Channel(channel));
  },
  async create(workspaceId: string, name: string): Promise<Channel> {
    const result = await api.post("/channels", { workspaceId, name });
    return new Channel(result.data);
  },
  async delete(channelId: string): Promise<boolean> {
    await api.delete(`/channels/${channelId}`);
    return true;
  },
};
