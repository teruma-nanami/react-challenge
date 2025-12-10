// import CreateWorkspaceModal from './CreateWorkspaceModal';
// import ProfileModal from './ProfileModal';

function WorkspaceSelector() {
  return (
    <div className="workspace-selector">
      <div className="workspaces">
        <div key={1} className={"workspace-icon"}>
          A
        </div>
        <div key={2} className={"workspace-icon"}>
          B
        </div>
        <div className="workspace-icon add">+</div>
      </div>
      <div className="user-profile">
        <div className={`avatar-img `}>
          <img
            src={
              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }
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
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </div>
      {/* <CreateWorkspaceModal /> */}
      {/* <ProfileModal /> */}
    </div>
  );
}
export default WorkspaceSelector;
