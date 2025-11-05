import { memo } from "react";

export const Setting = memo(() => {
  return (
    <>
      <div className="setting-container"></div>
      <h2 className="setting-title">Settings</h2>
      <form className="setting-form">
        <div className="form-group">
          <label htmlFor="email">Email Notifications</label>
          <input type="checkbox" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="privacy">Privacy Settings</label>
          <select id="privacy" name="privacy">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
        <button type="submit" className="setting-button">
          Save Settings
        </button>
      </form>
    </>
  );
});

export default Setting;
