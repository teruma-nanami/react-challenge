import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { subscribe, unsubscribe } from "../../lib/socket";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Channel } from "../../modules/channels/channel.entity";
import { channelRepository } from "../../modules/channels/channel.repository";
import { Message } from "../../modules/messages/message.entity";
import { messageRepository } from "../../modules/messages/message.repository";
import { Workspace } from "../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import "./Home.css";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import WorkspaceSelector from "./WorkspaceSelector";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const params = useParams();
  const { workspaceId, channelId } = params;
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId
  );
  const selectedChannel = channels.find((channel) => channel.id == channelId);

  const handleNewMessage = (message: Message) => {
    setMessages((messages) => [message, ...messages]);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((messages) => messages.filter((msg) => msg.id !== messageId));
  };
  useEffect(() => {
    (async () => {
      try {
        const workspaces = await workspaceRepository.find();
        setWorkspaces(workspaces);
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!workspaceId) return;
    (async () => {
      try {
        const channels = await channelRepository.find(workspaceId);
        setChannels(channels);
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      }
    })();
    subscribe(workspaceId, handleNewMessage, handleDeleteMessage);
    return () => {
      unsubscribe(workspaceId);
    };
  }, [workspaceId]);

  useEffect(() => {
    if (workspaceId == null || channelId == null) return;
    (async () => {
      try {
        const messages = await messageRepository.find(workspaceId, channelId);
        setMessages(messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    })();
  }, [channelId]);

  if (currentUser == null) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        selectWorkspaceId={workspaceId}
        setWorkspaces={setWorkspaces}
      />
      {selectedWorkspace != null && selectedChannel != null ? (
        <>
          <Sidebar
            selectedWorkspace={selectedWorkspace}
            channels={channels}
            selectedChannelId={channelId!}
            setChannels={setChannels}
          />
          <MainContent
            selectedChannel={selectedChannel}
            channels={channels}
            setChannels={setChannels}
            selectedWorkspaceId={workspaceId!}
            messages={messages}
            setMessages={setMessages}
          />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
