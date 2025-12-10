// import CreateChannelModal from './CreateChannelModal';
// import UserSearchModal from './UserSearchModal';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="workspace-header">
        <h2>{"test"}</h2>
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
          <li key={1} className={"active"}>
            <span className="channel-icon">#</span> {"test"}
          </li>
          <li>
            <span className="channel-icon add">+</span> Add channels
          </li>
        </ul>

        <div className="section-header channels-header">
          <span className="channel-icon add">+</span> Invite Pepole
        </div>
      </div>
      {/* <CreateChannelModal /> */}
      {/* <UserSearchModal /> */}
    </div>
  );
}
export default Sidebar;
