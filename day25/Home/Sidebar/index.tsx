export const Sidebar = () => {
  return (
    <>
      <div className="sidebar-overlay" />
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="sidebar-close-button">×</button>

          <div className="sidebar-user-info">
            <div className="sidebar-user-name" title="プロフィールを編集">
              テストユーザー
            </div>
            <button className="sidebar-edit-button" title="プロフィールを編集">
              ✏️
            </button>
          </div>
          {/* <div className="sidebar-edit-form">
              <input
                type="text"
                placeholder="ユーザー名を入力"
                className="sidebar-name-input"
                autoFocus
                maxLength={20}
              />

              <div className="sidebar-edit-actions">
                <button className="sidebar-save-button">保存</button>
                <button className="sidebar-cancel-button">キャンセル</button>
              </div>
            </div> */}
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <button className="sidebar-board-item">
              <span className="sidebar-board-name">ログアウト</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
