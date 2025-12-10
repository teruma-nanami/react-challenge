function UserSearchModal() {
  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>メンバーを招待する</h2>
          <button className="close-button">×</button>
        </div>

        <div className="modal-content">
          <div className="invite-form">
            <label htmlFor="invite-input">招待するメンバー：</label>
            <div className="selected-users-container">
              <div key={1} className="selected-user-chip">
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt={"test"}
                  className="user-avatar small"
                />
                <span>{"test"}</span>
                <button className="remove-user-button">×</button>
              </div>
              <input type="text" id="invite-input" className="invite-input" />
            </div>
          </div>
          <div className="user-suggestions">
            return (
            <div key={1} className={`user-suggestion-item`}>
              <img
                src={
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                }
                alt={"test"}
                className="user-avatar"
              />
              <div className="user-info">
                <div className="user-name">{"test"}</div>
                <div className="user-email">{"test@test.com"}</div>
              </div>
            </div>
            );
          </div>

          <div className="modal-footer">
            <button className="invite-button">招待する</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSearchModal;
