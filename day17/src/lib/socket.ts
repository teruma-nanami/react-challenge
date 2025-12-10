import { io } from "socket.io-client";
import { Message } from "../modules/messages/message.entity";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const socket = io(baseURL);

export const subscribe = (
  workspaceId: string,
  onNewMessage: (message: Message) => void,
  onDeleteMessage: (messageId: string) => void
) => {
  socket.emit("join-workspace", { workspaceId });
  socket.on("new-message", (message: Message) => {
    onNewMessage(new Message(message));
  });
  socket.on("delete-message", onDeleteMessage);
};

export const unsubscribe = (workspaceId: string) => {
  socket.emit("leave-workspace", { workspaceId });
  socket.off("new-message");
  socket.off("delete-message");
};
