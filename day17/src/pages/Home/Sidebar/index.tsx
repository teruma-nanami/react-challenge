import { useNavigate } from "react-router-dom";
import { Channel } from "../../../modules/channels/channel.entity";
import { channelRepository } from "../../../modules/channels/channel.repository";
import { useUiStore } from "../../../modules/ui/ui.state";
import { Workspace } from "../../../modules/workspaces/workspace.entity";
import CreateChannelModal from "./CreateChannelModal";
import UserSearchModal from "./UserSearchModal";

interface Props {
  selectedWorkspace: Workspace;
  selectedChannelId: string;
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
}

function Sidebar(props: Props) {
  const { selectedWorkspace, selectedChannelId, channels, setChannels } = props;
  const {
    showCreateChannelModal,
    setShowCreateChannelModal,
    showUserSearchModal,
    setShowUserSearchModal,
  } = useUiStore();
  const navigate = useNavigate();

  const createChannel = async (name: string) => {
    try {
      const newChannel = await channelRepository.create(
        selectedWorkspace.id,
        name
      );
      setChannels([...channels, newChannel]);
      setShowCreateChannelModal(false);
      navigate(`/${selectedWorkspace.id}/${newChannel.id}`);
    } catch (error) {
      console.error("チャンネルの作成に失敗しました", error);
    }
  };
  return (
    <div className="sidebar">
      <div className="workspace-header">
        <h2>{selectedWorkspace.name}</h2>
      </div>
      <div className="sidebar-section">
        <div className="section-header channels-header">
          <svg viewBox="0 0 20 20" width="10" height="10" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <h3>Channels</h3>
        </div>
        <ul className={`channels-list expanded`}>
          {channels.map((channel) => (
            <li
              key={channel.id}
              className={channel.id == selectedChannelId ? "active" : ""}
              onClick={() => navigate(`/${selectedWorkspace.id}/${channel.id}`)}
            >
              <span className="channel-icon">#</span> {channel.name}
            </li>
          ))}

          <li onClick={() => setShowCreateChannelModal(true)}>
            <span className="channel-icon add">+</span> Add channels
          </li>
        </ul>

        <div className="section-header channels-header">
          <span
            className="channel-icon add"
            onClick={() => setShowUserSearchModal(true)}
          >
            + Invite People
          </span>{" "}
        </div>
      </div>
      {showCreateChannelModal && (
        <CreateChannelModal onSubmit={createChannel} />
      )}
      {showUserSearchModal && (
        <UserSearchModal workspaceId={selectedWorkspace.id} />
      )}
    </div>
  );
}
export default Sidebar;
