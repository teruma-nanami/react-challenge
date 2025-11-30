function ProfileModal() {
  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>Edit your profile</h2>
        </div>

        <div className="profile-modal-content">
          <div className="profile-form">
            <div className="profile-form-left">
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="profile-input"
                />
              </div>
            </div>
            <div className="profile-form-right">
              <div className="profile-photo-section">
                <label>Profile photo</label>
                <div className="profile-photo-container">
                  <div className="profile-photo-placeholder">
                    <div className="profile-photo-circle" />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button className="upload-photo-button">Upload Photo</button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-modal-footer">
          <button className="cancel-button">Cancel</button>
          <button className="save-button">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
export default ProfileModal;
