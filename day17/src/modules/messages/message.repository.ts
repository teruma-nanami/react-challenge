import api from "../../lib/api";
import { Message } from "./message.entity";

export const messageRepository = {
  async create(
    workspaceId: string,
    channelId: string,
    content: string
  ): Promise<Message> {
    const result = await api.post(`/messages/${workspaceId}/${channelId}`, {
      content,
    });
    return new Message(result.data);
  },
  async find(workspaceId: string, channelId: string): Promise<Message[]> {
    const result = await api.get(`/messages/${workspaceId}/${channelId}`);
    return result.data.map((data: Message) => new Message(data));
  },
  async uploadImage(
    workspaceId: string,
    channelId: string,
    file: File
  ): Promise<Message> {
    const result = await api.postForm(
      `/messages/${workspaceId}/${channelId}/image`,
      { file }
    );
    return new Message(result.data);
  },
  async delete(messageId: string): Promise<boolean> {
    await api.delete(`/messages/${messageId}`);
    return true;
  },
};
