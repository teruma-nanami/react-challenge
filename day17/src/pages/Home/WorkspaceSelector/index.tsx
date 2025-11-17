import { useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../../../modules/auth/current-user.state";
import { useUiStore } from "../../../modules/ui/ui.state";
import { Workspace } from "../../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../../modules/workspaces/workspace.repository";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import ProfileModal from "./ProfileModal";

interface Props {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  selectWorkspaceId?: string;
}

function WorkspaceSelector(props: Props) {
  const { workspaces, setWorkspaces, selectWorkspaceId } = props;
  const {
    showCreateWorkspaceModal,
    setShowCreateWorkspaceModal,
    showProfileModal,
    setShowProfileModal,
  } = useUiStore();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      setShowCreateWorkspaceModal(false);
      setWorkspaces([...workspaces, newWorkspace]);
      navigate(`/${newWorkspace.id}/${newWorkspace.channels[0].id}`);
      console.log("Workspace created:", newWorkspace);
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("Token");
    setCurrentUser(undefined);
    navigate("/signin");
  };

  return (
    <div className="workspace-selector">
      <div className="workspaces">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={`workspace-icon ${
              selectWorkspaceId === workspace.id ? "active" : ""
            }`}
            title={workspace.name}
            onClick={() =>
              navigate(`/${workspace.id}/${workspace.channels[0].id}`)
            }
          >
            {workspace.name.charAt(0)}
          </div>
        ))}
      </div>
      <div className="user-profile">
        <div
          className={`avatar-img `}
          onClick={() => setShowCreateWorkspaceModal(true)}
        ></div>
        <div
          className="workspace-icon add"
          onClick={() => setShowCreateWorkspaceModal(true)}
        >
          +
        </div>
      </div>
      <div className="user-profile">
        <div
          className={`avatar-img `}
          onClick={() => setShowProfileModal(true)}
        >
          <img
            src={currentUser!.iconUrl}
            alt="Posted image"
            className="message-image"
          />
        </div>
        <div className="logout-button" title="ログアウト">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={logout}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </div>
      {showCreateWorkspaceModal && (
        <CreateWorkspaceModal onSubmit={createWorkspace} allowCancel={true} />
      )}
      {showProfileModal && <ProfileModal />}
    </div>
  );
}
export default WorkspaceSelector;
