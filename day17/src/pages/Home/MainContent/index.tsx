import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../../../modules/auth/current-user.state";
import { Channel } from "../../../modules/channels/channel.entity";
import { channelRepository } from "../../../modules/channels/channel.repository";
import { Message } from "../../../modules/messages/message.entity";
import { messageRepository } from "../../../modules/messages/message.repository";

interface Props {
  channels: Channel[];
  selectedChannel: Channel;
  setChannels: (channels: Channel[]) => void;
  selectedWorkspaceId: string;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

function MainContent(props: Props) {
  const {
    selectedChannel,
    channels,
    setChannels,
    selectedWorkspaceId,
    messages,
    setMessages,
  } = props;
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { currentUser } = useCurrentUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const groupMessagesByDate = () => {
    const messageMap = new Map<string, Message[]>();

    messages.forEach((message) => {
      const dateKey = message.dateString;
      if (!messageMap.has(dateKey)) {
        messageMap.set(dateKey, []);
      }
      messageMap.get(dateKey)!.push(message);
    });

    return Array.from(messageMap.entries()).map(([date, messages]) => ({
      date,
      messages,
    }));
  };

  const messageGroups = groupMessagesByDate();

  const deleteChannel = async () => {
    try {
      const confirmed = window.confirm(
        "このチャンネルを削除しますか？この操作は取り消せません。"
      );
      if (!confirmed) return;
      await channelRepository.delete(selectedChannel.id);
      const updatedChannels = channels.filter(
        (channel) => channel.id !== selectedChannel.id
      );
      setChannels(updatedChannels);
      navigate(`/${selectedWorkspaceId}/${updatedChannels[0].id}`);
    } catch (error) {
      console.error("チャンネルの削除に失敗しました", error);
    }
  };

  const createMessage = async () => {
    try {
      const newMessage = await messageRepository.create(
        selectedWorkspaceId,
        selectedChannel.id,
        content
      );
      console.log("Created message:", newMessage);
      setContent("");
    } catch (error) {
      console.error("メッセージの作成に失敗しました", error);
    }
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files == null || event.target.files[0] == null) return;
      const file = event.target.files[0];
      const newMessage = await messageRepository.uploadImage(
        selectedWorkspaceId,
        selectedChannel.id,
        file
      );
      console.log(newMessage);
      setMessages([newMessage, ...messages]);
    } catch (error) {
      console.error("画像のアップロードに失敗しました", error);
    }
  };

  const deleteMessage = async (message: Message) => {
    const confirmed = window.confirm(
      "このメッセージを削除しますか？この操作は取り消せません。"
    );
    if (!confirmed) return;
    try {
      await messageRepository.delete(message.id);
      setMessages(messages.filter((msg) => msg.id !== message.id));
    } catch (error) {
      console.error("メッセージの削除に失敗しました", error);
    }
  };

  return (
    <div className="main-content">
      <header className="channel-header">
        <div className="channel-info">
          <h2># {selectedChannel.name}</h2>
        </div>
        <div className="channel-actions">
          <button
            className="delete-channel-button"
            onClick={deleteChannel}
            title="チャンネルを削除"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </header>
      <div
        className="messages-container"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}
      >
        {messageGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            {group.messages.map((message) => {
              const user =
                message.user.id == currentUser?.id ? currentUser : message.user;
              return (
                <div key={message.id} className="message">
                  <div className="avatar">
                    <div className={`avatar-img `}>
                      <img
                        src={user.iconUrl}
                        alt="Posted image"
                        className="message-image"
                      />
                    </div>
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="username">{user.name}</span>
                      <span className="timestamp">{message.dateString}</span>
                      {currentUser?.id === message.user.id && (
                        <button
                          className="message-delete-button"
                          title="メッセージを削除"
                          onClick={() => deleteMessage(message)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="message-text">{message.content}</div>
                    {message.imageUrl != null && (
                      <div className="message-image-container">
                        <div className="message-image-wrapper">
                          <img
                            src={message.imageUrl}
                            alt="Posted Image"
                            className="msg-image"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="date-divider">
              <span>{group.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <div className="message-input-wrapper">
          <textarea
            className="message-input"
            placeholder="Message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="image-upload">
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              ref={fileInputRef}
              onChange={uploadImage}
            />
            <button
              className="action-button"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                viewBox="0 0 20 20"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="action-button" onClick={createMessage}>
              <svg
                viewBox="0 0 20 20"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M17.447 9.106a1 1 0 000 1.788l-14 7a1 1 0 01-1.409-1.169l1.429-5A1 1 0 014.429 11H9a1 1 0 100-2H4.429a1 1 0 01-.962-.725l-1.428-5a1 1 0 011.408-1.17l14 7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
